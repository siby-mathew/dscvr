import { useMemo } from "react";

import { useWallet } from "@solana/wallet-adapter-react";

export const useWalletConnection = () => {
  const {
    connected,
    connecting,
    disconnect,
    select,
    wallets,
    connect,
    wallet,
  } = useWallet();

  return useMemo(
    () => ({
      conectWallet: select,
      connecting,
      connectors: wallets,
      disconnect,
      isConnected: connected,
      connect,
      wallet,
    }),
    [connected, connecting, disconnect, select, wallets, connect, wallet]
  );
};
