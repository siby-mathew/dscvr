import { useMemo } from "react";
import { useLocks } from "./useLocks";

export const useLockedTokens = (mintAddress: string) => {
  const { data, isLoading } = useLocks();
  const result = data?.filter(
    (item) => item.account.tokenMint.toString() === mintAddress
  );

  return useMemo(
    () => ({
      data: result,
      isLoading,
    }),
    [isLoading, result]
  );
};
