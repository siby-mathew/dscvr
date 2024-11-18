import { Box, Container, Card, Flex } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { useWalletConnection } from "../../hooks/useWallet";
import { Header } from "../header";
const Placeholder: React.FC<{ isConnecting: boolean }> = () => {
  return (
    <Card
      bg="rgba(0,0,0,.1)"
      p={3}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Flex py={2}>Connect Wallet</Flex>
    </Card>
  );
};
export const Layout: React.FC<{ children: ReactElement }> = ({ children }) => {
  const { connecting, isConnected } = useWalletConnection();
  return (
    <Box>
      <Container maxW={"900px"}>
        <Box>
          <Header />
          <Box>
            {isConnected ? children : <Placeholder isConnecting={connecting} />}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
