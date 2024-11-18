"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  CanvasClient: () => CanvasClient,
  CanvasInterface: () => CanvasInterface2,
  createCanvasClient: () => createCanvasClient,
  isIframeContext: () => isIframeContext
});
module.exports = __toCommonJS(src_exports);
var CanvasInterface2 = __toESM(require("@dscvr-one/canvas-interface"), 1);

// src/client.ts
var import_eventemitter3 = __toESM(require("eventemitter3"), 1);
var CanvasInterface = __toESM(require("@dscvr-one/canvas-interface"), 1);
var CanvasClient = class {
  sourceOrigin;
  initialized = false;
  awaitingHandshake = false;
  initResponse = void 0;
  initialInteractionRegistered = false;
  eventBus = new import_eventemitter3.default();
  /**
   * @deprecated since version 2.0.0. Use `createCanvasClient` instead
   */
  constructor() {
    if (typeof window === "undefined") {
      throw new CanvasInterface.WindowNotDefinedError();
    }
    if (!document.referrer) {
      throw new CanvasInterface.ReferrerNotDefinedError();
    }
    this.sourceOrigin = document.referrer;
  }
  destroy() {
    this.initialized = false;
    this.initResponse = void 0;
    window.removeEventListener("message", this.handleReceiveMessage);
    window.removeEventListener("click", this.handleInitialInteraction);
    window.removeEventListener("focus", this.handleInitialInteraction);
    this.removeInitialInteractionListeners();
  }
  get isReady() {
    return !!this.initResponse;
  }
  async ready(onClose) {
    if (onClose) {
      this.eventBus.on("lifecycle:close", onClose);
    }
    if (this.initResponse) {
      return this.initResponse;
    }
    if (!this.initialized) {
      window.addEventListener("message", this.handleReceiveMessage);
      window.addEventListener("click", this.handleInitialInteraction);
      window.addEventListener("focus", this.handleInitialInteraction);
      this.sendHandshake();
      this.initialized = true;
    }
    return await this.subscribeOnce(
      CanvasInterface.Lifecycle.initResponseSchema
    );
  }
  subscribe(schema, callback) {
    const responseType = schema.shape.type.value;
    this.eventBus.on(
      responseType,
      (message) => {
        const parsedMessage = schema.safeParse(message);
        if (!parsedMessage.success) {
          return;
        }
        callback(message);
      }
    );
  }
  subscribeOnce(schema) {
    const responseType = schema.shape.type.value;
    return new Promise((resolve) => {
      this.eventBus.once(
        responseType,
        (message) => {
          const parsedMessage = schema.safeParse(message);
          if (!parsedMessage.success) {
            return;
          }
          resolve(message);
        }
      );
    });
  }
  sendMessage(message) {
    window.parent.postMessage(message, this.sourceOrigin);
  }
  sendMessageAndWaitResponse(message, responseSchema) {
    const responsePromise = this.subscribeOnce(responseSchema);
    this.sendMessage(message);
    return responsePromise;
  }
  openLink(url) {
    this.sendMessage({
      type: "user:open-link-request",
      payload: {
        url
      }
    });
  }
  resize(newPayload) {
    const payload = newPayload ?? this.getWindowSize();
    if (payload.width <= 0 || payload.height <= 0) {
      return;
    }
    this.sendMessage({
      type: "user:resize-request",
      payload
    });
  }
  createPost(htmlContent) {
    return this.sendMessageAndWaitResponse(
      {
        type: "user:create-post-request",
        payload: {
          htmlContent
        }
      },
      CanvasInterface.User.createPostResponseSchema
    );
  }
  createShareLink(urlData) {
    return this.sendMessageAndWaitResponse(
      {
        type: "user:create-share-link-request",
        payload: {
          urlData
        }
      },
      CanvasInterface.User.createShareLinkResponseMessageSchema
    );
  }
  copyToClipboard(content) {
    return this.sendMessageAndWaitResponse(
      {
        type: "user:copy-to-clipboard-request",
        payload: {
          content
        }
      },
      CanvasInterface.User.copyToClipboardResponseSchema
    );
  }
  onContentReaction(callback) {
    this.subscribe(
      CanvasInterface.User.contentReactionResponseSchema,
      callback
    );
  }
  connectWallet(chainId) {
    return this.sendMessageAndWaitResponse(
      {
        type: "user:connect-wallet-request",
        payload: {
          chainId
        }
      },
      CanvasInterface.User.connectWalletResponseSchema
    );
  }
  signAndSendTransaction(payload) {
    return this.sendMessageAndWaitResponse(
      {
        type: "user:sign-send-transaction-request",
        payload
      },
      CanvasInterface.User.signAndSendTransactionResponseSchema
    );
  }
  async connectWalletAndSendTransaction(chainId, createTx) {
    const walletResponse = await this.connectWallet(chainId);
    if (!walletResponse.untrusted.success) {
      return {
        ...walletResponse,
        untrusted: {
          ...walletResponse.untrusted
        },
        type: "user:sign-send-transaction-response"
      };
    }
    const payload = await createTx(walletResponse);
    if (!payload) {
      return;
    }
    return await this.signAndSendTransaction({
      chainId,
      ...payload
    });
  }
  sendHandshake() {
    if (this.awaitingHandshake) {
      return;
    }
    this.awaitingHandshake = true;
    this.sendMessage({
      type: "lifecycle:init-request",
      payload: {
        version: CanvasInterface.VERSION
      }
    });
  }
  handleReceiveMessage = (event) => {
    const messageData = event.data;
    const message = CanvasInterface.parseBaseHostMessage(messageData);
    if (!message) {
      return;
    }
    const parsedInitMessage = CanvasInterface.Lifecycle.initResponseSchema.safeParse(messageData);
    if (parsedInitMessage.success) {
      if (this.initResponse) {
        throw new CanvasInterface.ClientAlreadyInitializedError(
          "Use `destroy` method to reset the client"
        );
      }
      this.initResponse = parsedInitMessage.data;
      this.awaitingHandshake = false;
    } else if (!this.initResponse) {
      throw new CanvasInterface.ClientNotInitializedError();
    }
    this.eventBus.emit(message.type, message);
  };
  handleInitialInteraction = () => {
    this.removeInitialInteractionListeners();
    if (!this.initialInteractionRegistered) {
      this.initialInteractionRegistered = true;
      this.sendMessage({
        type: "user:initial-interaction-request"
      });
    }
  };
  removeInitialInteractionListeners() {
    window.removeEventListener("click", this.handleInitialInteraction);
    window.removeEventListener("focus", this.handleInitialInteraction);
  }
  getWindowSize() {
    return {
      width: window.document.body.clientWidth,
      height: window.document.body.clientHeight
    };
  }
};

// src/context.ts
var isIframeContext = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
};

// src/create.ts
var canvasClient = void 0;
var createCanvasClient = () => {
  if (!isIframeContext()) {
    console.warn("CanvasClient must be created in an iframe context");
    return;
  }
  if (canvasClient) {
    return canvasClient;
  }
  canvasClient = new CanvasClient();
  return canvasClient;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CanvasClient,
  CanvasInterface,
  createCanvasClient,
  isIframeContext
});
//# sourceMappingURL=index.cjs.map