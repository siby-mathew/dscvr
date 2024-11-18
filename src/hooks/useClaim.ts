import { useGetProgramInstance } from "./useProgramInstance";
import { useCallback, useMemo, useState } from "react";
import {
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { AllFastPoolResponse } from "..";
import { PROGRAM_ID } from "../const/config";
import { PublicKey } from "@solana/web3.js";
import { web3 } from "@project-serum/anchor";

export function deriveEscrow(base: web3.PublicKey, programId: web3.PublicKey) {
  return web3.PublicKey.findProgramAddressSync(
    [Buffer.from("escrow"), base.toBuffer()],
    programId
  );
}
export const useClaim = () => {
  const lockProgram = useGetProgramInstance();
  const [isLoading, setIsLoading] = useState(false);
  const [txn, setTxn] = useState("");
  const [message, setMeesage] = useState("");
  const onClaim = useCallback(
    async (account: AllFastPoolResponse[0]["account"]) => {
      if (account.creator) {
        setIsLoading(true);
        const [escrow] = deriveEscrow(account.base, new PublicKey(PROGRAM_ID));

        const escrowToken = getAssociatedTokenAddressSync(
          account.tokenMint,
          escrow,
          true,
          TOKEN_PROGRAM_ID,
          ASSOCIATED_TOKEN_PROGRAM_ID
        );

        const [traderTokenAccount] = web3.PublicKey.findProgramAddressSync(
          [
            account.recipient.toBytes(),
            TOKEN_PROGRAM_ID.toBytes(),
            account.tokenMint.toBytes(),
          ],
          ASSOCIATED_TOKEN_PROGRAM_ID
        );
        try {
          const res = await lockProgram?.program?.methods
            .claim(account.amountPerPeriod)
            .accounts({
              recipientToken: traderTokenAccount,
              escrowToken,
              program: new PublicKey(PROGRAM_ID),
              escrow: escrow,
              eventAuthority: "4sVWZLK2JLbT2bUDHtSXLDuJrqy8Suef5vfkVgMmt8Py",
              tokenProgram: TOKEN_PROGRAM_ID,
            })
            .rpc();
          setIsLoading(false);
          setMeesage("Completed");
          setTxn(res ?? "uu");
        } catch {
          setMeesage("failed");
          setIsLoading(false);
          setTxn("");
        }
      }
    },
    [lockProgram]
  );
  const reset = useCallback(() => {
    setMeesage("");
    setTxn("");
    setIsLoading(false);
  }, []);
  return useMemo(
    () => ({
      onClaim,
      isLoading,
      txn,
      reset,
      message,
    }),
    [onClaim, isLoading, txn, reset, message]
  );
};

//9 - rece

// let { isAssertion, escrow, recipient, maxAmount, recipientToken } = params;
//     const program = createLockerProgram(new Wallet(recipient));
//     const escrowState = await program.account.vestingEscrow.fetch(escrow);

//     const escrowToken = getAssociatedTokenAddressSync(
//         escrowState.tokenMint,
//         escrow,
//         true,
//         TOKEN_PROGRAM_ID,
//         ASSOCIATED_TOKEN_PROGRAM_ID
//     );

//     await program.methods.claim(maxAmount).accounts({
//         tokenProgram: TOKEN_PROGRAM_ID,
