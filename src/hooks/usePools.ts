import { useMemo } from "react";
import { useLocks } from "./useLocks";

export const usePools = () => {
  const { isLoading, data } = useLocks();
  const ids: string[] = [];
  const filterd = data?.filter((item) => {
    if (ids.indexOf(item.account.tokenMint.toString()) === -1) {
      ids.push(item.account.tokenMint.toString());
      return true;
    }
    return false;
  });

  return useMemo(
    () => ({
      data: filterd,
      isLoading,
    }),
    [filterd, isLoading]
  );
};
