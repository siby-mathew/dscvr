import {
  Card,
  Flex,
  SkeletonText,
  Image,
  Skeleton,
  Box,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useTokenMetadata } from "../../hooks/useToken";
import { MdOutlineError } from "react-icons/md";
export const PoolCard: React.FC<{ mintAddress: string }> = ({
  mintAddress,
}) => {
  const { isMetaDataLoading, poolTokenMetadata } = useTokenMetadata(
    mintAddress,
    true
  );
  if (!isMetaDataLoading && !poolTokenMetadata) {
    return (
      <Box
        p={5}
        bg="rgba(0,0,0,.1)"
        borderRadius={2}
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
        userSelect={"none"}
        flexDirection={"column"}
      >
        <Box fontSize={30}>
          <MdOutlineError />
        </Box>
        <Text opacity={0.4}>Invalid mint address</Text>
      </Box>
    );
  }
  return (
    <Card flexDirection={"row"}>
      <Flex py={2} px={2}>
        <Skeleton
          boxSize={"50px"}
          borderRadius={"full"}
          isLoaded={!!poolTokenMetadata?.logoUrl}
        >
          <Image
            boxSize={"50px"}
            src={poolTokenMetadata?.logoUrl}
            borderRadius={"full"}
          />
        </Skeleton>
      </Flex>
      <Flex direction={"column"} px={2} justifyContent={"center"}>
        <Flex fontWeight={"bold"} mb={1}>
          <SkeletonText
            isLoaded={!isMetaDataLoading}
            noOfLines={1}
            minWidth={"100px"}
          >
            {poolTokenMetadata?.name}
          </SkeletonText>
        </Flex>
        <Flex>
          <SkeletonText
            isLoaded={!isMetaDataLoading}
            noOfLines={1}
            minWidth={"80px"}
          >
            {poolTokenMetadata?.symbol}
          </SkeletonText>
        </Flex>
      </Flex>
    </Card>
  );
};
