import { Box, Spinner, Text } from "@chakra-ui/react";
import React from "react";

import { useMintAddress } from "../../hooks/useMintAddress";
import { PoolCard } from "../pool";
import { useLockedTokens } from "../../hooks/useLockedTokens";
import { LockedToken } from "../locked-token";
export const Locks: React.FC = () => {
  const mintAddress = useMintAddress();
  const { data, isLoading } = useLockedTokens(mintAddress);

  return (
    <Box>
      <Box>
        <PoolCard mintAddress={mintAddress} />
      </Box>
      <Box py={3}>
        <Box as="h1" fontWeight={"bold"}>
          Locked Tokens
        </Box>
        {!isLoading && data && data.length > 0 && (
          <Box py={3}>
            {data &&
              data.map((item, index) => {
                return (
                  <LockedToken
                    bg={`rgba(0,0,0,${index % 2 == 0 ? ".1" : ".2"})`}
                    {...item}
                    key={item.publicKey.toString()}
                  />
                );
              })}
          </Box>
        )}

        {isLoading ||
          !data ||
          (!data.length && (
            <Box
              py={10}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              bg="rgba(0,0,0,.1)"
              mt={3}
            >
              {isLoading ? (
                <Spinner />
              ) : (
                <Text opacity={0.3}>No results found</Text>
              )}
            </Box>
          ))}
      </Box>
    </Box>
  );
};
