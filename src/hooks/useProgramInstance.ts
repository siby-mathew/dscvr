import { Connection, PublicKey } from "@solana/web3.js";
import { AnchorProvider, Program } from "@project-serum/anchor";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { LockerIdl, Locker } from "../idl";
import { PROGRAM_ID, RPC_ENDPOINT } from "../const/config";
import { useMemo } from "react";

export const connection = new Connection(RPC_ENDPOINT, "confirmed");
export const SOLMAIL_PROGRAM_ID = PROGRAM_ID;

export const useGetProgramInstance = () => {
  const anchorWallet = useAnchorWallet();
  const { wallet, connected } = useWallet();

  const memoizedValues = useMemo(() => {
    if (
      !wallet?.adapter ||
      !connected ||
      !wallet?.adapter?.publicKey ||
      !anchorWallet
    )
      return {};

    const programID = new PublicKey(SOLMAIL_PROGRAM_ID);
    const [mailAccountAddress] = PublicKey.findProgramAddressSync(
      [Buffer.from("mail-accountv2"), wallet?.adapter?.publicKey.toBuffer()],
      programID
    );

    const provider = new AnchorProvider(connection, anchorWallet, {
      preflightCommitment: "confirmed",
    });
    const program = new Program<Locker>(
      LockerIdl as Locker,
      programID,
      provider
    ) as Program<Locker>;

    return {
      provider,
      program,
      mailAccountAddress,
    };
  }, [anchorWallet, connected, wallet]);

  return memoizedValues;
};
