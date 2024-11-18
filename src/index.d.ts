import { AccountNamespace, Idl } from "@project-serum/anchor";
import { Locker } from "./idl";
declare module "@solana/wallet-adapter-wallets";
export type Nullish<T> = null | T | undefined;

export type NumberType = Decimal | number | string;
export type GetAllAccountReturnType<
  T extends Idl,
  K extends keyof AccountNamespace<T>,
> = Awaited<ReturnType<AccountNamespace<T>[K]["all"]>>;

export type AllFastPoolResponse = GetAllAccountReturnType<
  Locker,
  "vestingEscrow"
>;
// from spl-tokens
export type TokenMetadataBase = {
  // Any additional metadata about the token as key-value pairs
  additionalMetadata: [string, string][];
  // The associated mint, used to counter spoofing to be sure that metadata belongs to a particular mint
  mint: PublicKey;
  // The longer name of the token
  name: string;
  // The shortened symbol for the token
  symbol: string;
  // The authority that can sign to update the metadata
  updateAuthority?: PublicKey;
  // The URI pointing to richer metadata
  uri: string;
};

export type PoolAndTokenMetadataReturnData = {
  dcd: string;
  description: string;
  gh: string;
  image: string;
  rmp: string;
  tg: string;
  tld: string;
  wb: string;
  wp: string;
  x: string;
} & { totalSupply: string } & TokenMetadataBase;
export type PoolAndTokenBaseInfo = {
  logoUrl: string;
  mint: PublicKey;
  name: string;
  poolDescription: string;
  symbol: string;
  totalSupply: string;
};

export type PoolAndTokenMetadataReturnData = {
  dcd: string;
  description: string;
  gh: string;
  image: string;
  rmp: string;
  tg: string;
  tld: string;
  wb: string;
  wp: string;
  x: string;
} & { totalSupply: string } & TokenMetadataBase;
export type BigIntish = bigint | NumberType;
export const SOCIAL_ICONS_MAP = {
  discord: FaDiscord,
  gitbook: SiGitbook,
  github: FaGithub,
  medium: FaMedium,
  roadmap: GoProjectRoadmap,
  telegram: BiLogoTelegram,
  twitter: FaXTwitter,
  website: IoIosLink,
  whitepaper: IoDocumentTextOutline,
} as const;

type SocialIconsKeys = keyof typeof SOCIAL_ICONS_MAP;
type SocialLinks = Partial<Record<SocialIconsKeys, string>>;
export type PoolAndTokenMetaData = PoolAndTokenBaseInfo & SocialLinks;
