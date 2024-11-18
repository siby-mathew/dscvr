import { skipToken, useQuery } from "@tanstack/react-query";
import { useGetProgramInstance } from "./useProgramInstance";
import { useMemo } from "react";
import { AllFastPoolResponse } from "..";

export const useLocks = () => {
  const lockProgram = useGetProgramInstance();

  const { data, isLoading } = useQuery<AllFastPoolResponse>({
    queryFn: lockProgram?.program?.account?.vestingEscrow
      ? () => lockProgram?.program?.account.vestingEscrow.all()
      : skipToken,
    queryKey: ["vesting-escrow"],
  });

  return useMemo(
    () => ({
      data,
      isLoading,
    }),
    [data, isLoading]
  );
};
