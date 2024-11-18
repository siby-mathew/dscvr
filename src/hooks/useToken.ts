import { Metaplex } from "@metaplex-foundation/js";
import {
  getMint,
  getTokenMetadata,
  TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { skipToken, useQueries, useQuery } from "@tanstack/react-query";

import { DEFAULT_TOKEN_DECIMAL, NATIVE_TOKEN_ADDRESS } from "../const/config";
import { connection } from "../hooks/useWeb3React";
import { Token } from "../utils/token";
import { PoolAndTokenMetaData, PoolAndTokenMetadataReturnData } from "..";

// import { SolLogo } from "@assets/icons";

async function getLegacyTokenMetadata(token: PublicKey) {
  const metaplex = Metaplex.make(connection);

  const metadataAccount = metaplex.nfts().pdas().metadata({ mint: token });

  const metadataAccountInfo = await connection.getAccountInfo(metadataAccount);

  if (metadataAccountInfo) {
    const metadata = await metaplex.nfts().findByMint({ mintAddress: token });
    return { ...metadata, mint: metadata.mint.address };
  }
}

const fetchTokenMetadata = async (
  token: PublicKey,
  isLegacyTokenProgram?: boolean
) => {
  if (token.toString().toLowerCase() === NATIVE_TOKEN_ADDRESS.toLowerCase()) {
    return {
      dcd: "",
      description: "",
      gh: "",
      image: "",
      mint: token,
      name: "Solana",
      rmp: "",
      symbol: "SOL",
      tg: "",
      tld: "",
      totalSupply: "",
      wb: "",
      wp: "",
      x: "",
    };
  }
  const { supply } = await getMint(
    connection,
    token,
    "confirmed",
    isLegacyTokenProgram ? TOKEN_PROGRAM_ID : TOKEN_2022_PROGRAM_ID
  );

  let metadata;

  if (isLegacyTokenProgram) metadata = await getLegacyTokenMetadata(token);
  else metadata = await getTokenMetadata(connection, token);

  if (metadata?.uri) {
    const parsedJson = await fetch(metadata.uri).then((res) => res.json());
    if (parsedJson) {
      metadata = {
        ...metadata,
        ...parsedJson,
      };
    }
  }
  return (
    metadata &&
    ({
      ...metadata,
      totalSupply: supply.toString(),
    } as null | PoolAndTokenMetadataReturnData)
  );
};

export const useTokenMetadata = (
  tokenId: string,
  isLegacyTokenProgram: boolean = false,
  skip: boolean = false
) => {
  const { data: tokenMetadata, isLoading: isMetaDataLoading } = useQuery({
    gcTime: Infinity,
    queryFn:
      !skip && tokenId
        ? () => fetchTokenMetadata(new PublicKey(tokenId), isLegacyTokenProgram)
        : skipToken,
    queryKey: ["token-metadata", tokenId, isLegacyTokenProgram],
  });

  const metdataFormatted: null | PoolAndTokenMetaData | undefined =
    tokenMetadata && {
      discord: tokenMetadata.dcd,
      github: tokenMetadata.gh,
      logoUrl: tokenMetadata.image,
      mint: tokenMetadata.mint,
      name: tokenMetadata?.name,
      poolDescription: tokenMetadata.tld,
      roadmap: tokenMetadata.rmp,
      symbol: tokenMetadata?.symbol,
      telegram: tokenMetadata.tg,
      totalSupply: Token.fromRawAmount(
        tokenMetadata.totalSupply,
        DEFAULT_TOKEN_DECIMAL
      ).toString(),
      twitter: tokenMetadata.x,
      website: tokenMetadata.wb,
      whitepaper: tokenMetadata.wp,
    };

  return {
    isMetaDataLoading,
    poolTokenMetadata: metdataFormatted ?? null,
  };
};

export const useMultiTokensMetadata = (
  tokenIds: PublicKey[],
  isLegacyTokenProgram?: boolean
) => {
  const { data, isLoading } = useQueries({
    combine: (results) => ({
      data: results.map((result) => result.data),
      isError: results.some((result) => result.isError),
      isLoading: results.some((result) => result.isLoading),
      isSuccess: results.every((result) => result.isSuccess),
      pending: results.some((result) => result.isPending),
    }),
    queries: tokenIds.map((token) => ({
      queryFn: () => fetchTokenMetadata(token, isLegacyTokenProgram),
      queryKey: ["token-metadata", token.toString(), isLegacyTokenProgram],
    })),
  });

  const tokensMetadataFormatted: (null | PoolAndTokenMetaData)[] = data.map(
    (tokenMetadata) =>
      tokenMetadata
        ? {
            discord: tokenMetadata.dcd,
            github: tokenMetadata.gh,
            logoUrl: tokenMetadata.image,
            mint: tokenMetadata.mint,
            name: tokenMetadata?.name,
            poolDescription: tokenMetadata.tld,
            roadmap: tokenMetadata.rmp,
            symbol: tokenMetadata?.symbol,
            telegram: tokenMetadata.tg,
            totalSupply: Token.fromRawAmount(
              tokenMetadata.totalSupply,
              DEFAULT_TOKEN_DECIMAL
            ).toString(),
            twitter: tokenMetadata.x,
            website: tokenMetadata.wb,
            whitepaper: tokenMetadata.wp,
          }
        : null
  );

  return {
    isMetaDataLoading: isLoading,
    poolTokensMetadata: tokensMetadataFormatted,
  };
};
