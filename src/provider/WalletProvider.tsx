import { useMemo } from "react";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  // BitgetWalletAdapter,
  // Coin98WalletAdapter,
  // CoinbaseWalletAdapter,
  LedgerWalletAdapter,
  // MathWalletAdapter,
  PhantomWalletAdapter,
  SafePalWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  TrezorWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { RPC_ENDPOINT } from "../const/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SolanaWalletProvider = ({ children }: any) => {
  const endpoint = RPC_ENDPOINT; //  useMemo(() => clusterApiUrl(network), [network]);
  // console.log(CanvasClient);
  const wallets = useMemo(
    () => [
      // new CoinbaseWalletAdapter(),
      //   new WalletConnectWalletAdapter({ network: endpoint }),
      new PhantomWalletAdapter(),
      new SafePalWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
      new TrezorWalletAdapter(),
      // new BitgetWalletAdapter(),
      // new Coin98WalletAdapter(),
      // new MathWalletAdapter(),
    ],
    []
  );
  return (
    <ConnectionProvider endpoint={endpoint}>
      <QueryClientProvider client={queryClient}>
        <WalletProvider wallets={wallets}>{children}</WalletProvider>
      </QueryClientProvider>
    </ConnectionProvider>
  );
};
