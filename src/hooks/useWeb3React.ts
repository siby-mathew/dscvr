import { useMemo } from "react";

import { AnchorProvider } from "@project-serum/anchor";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { Connection, Keypair } from "@solana/web3.js";

import ProxyWallet from "../utils/proxyWallet";
import { RPC_ENDPOINT } from "../const/config";

export const connection = new Connection(RPC_ENDPOINT, "confirmed");

console.log(connection);
/**
 * Custom hook to get a web3 provider.
 *
 * @param [withSignerIfPossible=true] - Flag indicating whether to use a signer if available.
 * @returns {AnchorProvider | null} - The Anchor provider instance.
 *
 * @example
 * const provider = useWeb3Provider(true);
 */
export const useWeb3Provider = (
  withSignerIfPossible = true
): AnchorProvider | undefined => {
  const anchorWallet = useAnchorWallet();

  const provider = withSignerIfPossible
    ? anchorWallet &&
      new AnchorProvider(connection, anchorWallet, {
        preflightCommitment: "confirmed",
      })
    : new AnchorProvider(connection, new ProxyWallet(Keypair.generate()), {
        preflightCommitment: "confirmed",
      });

  return provider;
};

/**
 * Custom hook to interact with the web3 wallet and connection.
 *
 * @returns An object containing connection state and wallet methods.
 * @returns connecting - Indicates if the wallet is currently connecting.
 * @returns connection - The current web3 connection.
 * @returns isConnected - Indicates if the wallet is connected.
 * @returns publicKey - The public key of the connected wallet.
 * @returns sendTransaction - Function to send transactions.
 * @returns wallet - The connected wallet instance.
 *
 * @example
 * const { connecting, connection, isConnected, publicKey, sendTransaction, wallet } = useWeb3React();
 */
export const useWeb3React = () => {
  const { connected, connecting, publicKey, sendTransaction, wallet } =
    useWallet();

  return useMemo(
    () => ({
      connecting,
      connection,
      isConnected: connected,
      publicKey,
      sendTransaction,
      wallet,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [connected, publicKey]
  );
};
