import type { Wallet } from "@project-serum/anchor";
import type { Keypair, PublicKey, VersionedTransaction } from "@solana/web3.js";

import { Transaction } from "@solana/web3.js";

/**
 * A wallet implementation that uses a provided Keypair for signing transactions.
 *
 * @example
 * const keypair = Keypair.generate();
 * const proxyWallet = new ProxyWallet(keypair);
 */
export default class ProxyWallet implements Wallet {
  /**
   * Creates an instance of ProxyWallet.
   *
   * @param payer - The Keypair used for signing transactions.
   */
  constructor(readonly payer: Keypair) {}

  /**
   * Signs all transactions in the provided array using the payer's Keypair.
   *
   * @param txs - The array of transactions to be signed.
   * @returns A promise that resolves with the signed transactions.
   */
  async signAllTransactions<T extends Transaction | VersionedTransaction>(
    txs: T[]
  ): Promise<T[]> {
    return txs.map((t) => {
      if (t instanceof Transaction) {
        t.partialSign(this.payer);
      }
      return t;
    });
  }

  /**
   * Signs a single transaction using the payer's Keypair.
   *
   * @param tx - The transaction to be signed.
   * @returns A promise that resolves with the signed transaction.
   */
  async signTransaction<T extends Transaction | VersionedTransaction>(
    tx: T
  ): Promise<T> {
    if (tx instanceof Transaction) {
      tx.partialSign(this.payer);
    }

    return tx;
  }

  /**
   * Gets the public key associated with the payer's Keypair.
   *
   * @returns The public key of the payer's Keypair.
   */
  get publicKey(): PublicKey {
    return this.payer.publicKey;
  }
}
