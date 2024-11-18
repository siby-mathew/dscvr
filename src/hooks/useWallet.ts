import { useMemo } from "react";

import { useWallet } from "@solana/wallet-adapter-react";

export const useWalletConnection = () => {
  const { connected, connecting, disconnect, select, wallets, connect } =
    useWallet();

  return useMemo(
    () => ({
      conectWallet: select,
      connecting,
      connectors: wallets,
      disconnect,
      isConnected: connected,
      connect,
    }),
    [connected, connecting, disconnect, select, wallets, connect]
  );
};
