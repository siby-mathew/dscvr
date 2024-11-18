import { skipToken, useQuery } from "@tanstack/react-query";
import { connection, useWeb3React } from "./useWeb3React";

import { useMemo } from "react";
import { PublicKey } from "@metaplex-foundation/js";
import AmmImpl from "@mercurial-finance/dynamic-amm-sdk";
import { useMintAddress } from "./useMintAddress";
export const usePositions = () => {
  const { publicKey } = useWeb3React();
  const mintAddress = useMintAddress();

  const { data, isLoading } = useQuery({
    queryKey: ["position", publicKey, mintAddress],
    queryFn: mintAddress
      ? () => AmmImpl.searchPoolsByToken(connection, new PublicKey(mintAddress))
      : skipToken,
  });

  return useMemo(
    () => ({
      data,
      isLoading,
    }),
    [isLoading, data]
  );
};
