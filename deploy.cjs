const AWS = require("aws-sdk"),
  path = require("path"),
  fs = require("fs"),
  util = require("util"),
  mime = require("mime-types");

const { glob } = require("glob");

let dotenv = require("dotenv").config();

projectRoot = path.join(__dirname);

var awsconfig = {
  awsAccessKeyId: process.env.awsAccessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  awsRegion: process.env.awsRegion,
};
var buckets = {
  dev: "tools.apeon.it",
};
var distributions = {
  dev: "EYLEUZ1TMFLAS",
};

const buildFolder = "dist";

var asyncForEach = async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};
var readFile = util.promisify(fs.readFile);
var deleteFile = async function (f) {
  return new Promise((resolve, reject) => {
    fs.unlink(f, function (err) {
      if (err) resolve(false);
      resolve(true);
    });
  });
};

const uploadTos3 = async function (buildType = "dev") {
  if (!buildType) return 0;
  var s3 = new AWS.S3({
    accessKeyId: awsconfig.awsAccessKeyId,
    secretAccessKey: awsconfig.secretAccessKey,
  });
  const fileList = await getDirectyFiles(buildFolder);
  let folders = [];

  fileList.forEach((file) => {
    let parts = file.split("/");
    let folderPath = parts.slice(0, -1).join("/").trim();
    if (folderPath && !folders.includes(folderPath)) {
      folders.push(folderPath);
    }
  });
  if (!fileList.length) console.log(buildFolder + " folder empty..");
  else {
    console.log("Deployment (" + buildType + ") Started...");
    var params = { Bucket: buckets[buildType], Delimiter: "/" };

    await s3
      .listObjectsV2(params)
      .promise()
      .then(async ({ Contents }) => {
        if (Contents.length)
          await s3
            .deleteObjects({
              Bucket: buckets[buildType],
              Delete: { Objects: Contents.map((item) => ({ Key: item.Key })) },
            })
            .promise();
      });

    for (let folder of folders) {
      await s3
        .listObjectsV2({ Bucket: buckets[buildType], Delimiter: "/" + folder })
        .promise()
        .then(async ({ Contents }) => {
          if (Contents.length)
            await s3
              .deleteObjects({
                Bucket: buckets[buildType],
                Delete: {
                  Objects: Contents.map((item) => ({ Key: item.Key })),
                },
              })
              .promise();
        });
    }

    console.log("cleaned up bucket");
    console.log("Upload Started...");

    await asyncForEach(fileList, async function (item, index) {
      var fileContent = await readFile(
        projectRoot + `/${buildFolder}/` + item
      ).catch((err) => {
        console.log("error on read (" + index + ")" + item);
      });

      if (fileContent) {
        var mimeType = mime.lookup(projectRoot + "/dist/" + item);
        var params = {
          Bucket: buckets[buildType],
          Key: item,
          Body: fileContent,
          ContentType: mimeType,
        };
        console.log("File Name - ", item);
        var s = await s3.putObject(params).promise();
        console.log("completed " + index + " of " + fileList.length);
      }
    });

    console.log("Upload complete...");
    console.log("Deployed " + buildType);

    console.log("Running Invalidations");

    var items = ["/*"];
    var cloudfront = new AWS.CloudFront({
      accessKeyId: awsconfig.awsAccessKeyId,
      secretAccessKey: awsconfig.secretAccessKey,
    });

    var params = {
      DistributionId: distributions[buildType],
      InvalidationBatch: {
        CallerReference: new Date().getTime().toString() /* required */,
        Paths: { Quantity: 1, Items: items },
      },
    };
    var s = await cloudfront.createInvalidation(params).promise();
    console.log("Invalidations complete...");
  }
};

var getDirectyFiles = async function (src) {
  return new Promise(async (resolve, reject) => {
    var res = await glob(src + "/**/*");
    res.forEach((el, i) => {
      res[i] = res[i].replace(/\\/g, "/");
      res[i] = res[i].replace(src + "/", "");
    });
    resolve(res);
  });
};

uploadTos3(process.argv[2]);
