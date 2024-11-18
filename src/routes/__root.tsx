import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { SolanaWalletProvider } from "../provider/WalletProvider";
import { Layout } from "../components/layout";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../theme";
import { CanvasProvider } from "../provider/CanvasProvider";
export const Route = createRootRoute({
  component: () => (
    <CanvasProvider>
      <SolanaWalletProvider>
        <ChakraProvider theme={theme}>
          <Layout>
            <Outlet />
          </Layout>
          <TanStackRouterDevtools />
        </ChakraProvider>
      </SolanaWalletProvider>
    </CanvasProvider>
  ),
});
