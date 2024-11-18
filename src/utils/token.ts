import { PublicKey } from "@solana/web3.js";
import Decimal from "decimal.js";

import {
  convertReadableValuesToDecimals,
  fromReadableValuesFromDecimals,
} from "../utils/lamportsHelper";
import { BigIntish } from "..";

/**
 * Represents a Solana token with basic details and utility methods for conversions.
 */
export class Token {
  public address: PublicKey;

  public decimal: number;

  public isCollateral: boolean;

  public isNative: boolean;

  public logoUrl: string;

  public name: string;

  public symbol: string;

  /**
   * Creates a new Token instance.
   * @param name - The name of the token.
   * @param symbol - The symbol of the token.
   * @param decimal - The number of decimal places the token uses.
   * @param address - The address of the token, which can be a PublicKey or a string.
   * @param logoUrl - The URL of the token's logo.
   * @param isNative - Indicates if the token is native or not.
   * @param isCollateral - Indicates if this token is a base token in an LBP.
   */
  constructor(
    name: string,
    symbol: string,
    decimal: number,
    address: PublicKey | string,
    logoUrl?: string,
    isNative?: boolean,
    isCollateral?: boolean
  ) {
    this.name = name;
    this.symbol = symbol;
    this.decimal = decimal;
    this.address = Token.toPublicKey(address);
    this.logoUrl = logoUrl || "";
    this.isNative = isNative || false;
    this.isCollateral = isCollateral || false;
  }

  /**
   * Converts a raw amount (in lamports) to a decimal value (readable format).
   * @param rawAmount - The raw amount to convert.
   * @param decimals - The number of decimal places.
   * @returns The converted decimal value.
   */
  public static fromRawAmount(
    rawAmount: BigIntish,
    decimals?: BigIntish
  ): Decimal {
    return fromReadableValuesFromDecimals(rawAmount, decimals);
  }

  /**
   * Converts a decimal value (readable format) to a raw amount (in lamports).
   * @param decimalValue - The decimal value to convert.
   * @param decimals - The number of decimal places.
   * @returns The converted raw amount.
   */
  public static toRawAmount(
    decimalValue: BigIntish,
    decimals?: BigIntish
  ): string {
    return convertReadableValuesToDecimals(decimalValue, decimals);
  }

  /**
   * Converts an address from string or PublicKey to a PublicKey instance.
   * @param address - The address as a string or PublicKey.
   * @returns The address as a PublicKey instance.
   */
  private static toPublicKey(address: PublicKey | string): PublicKey {
    return typeof address === "string" ? new PublicKey(address) : address;
  }
}

const cachedToken: { [address: string]: Token } = {};

export const getTokenInstance = (
  name: string,
  symbol: string,
  decimal: number,
  address: PublicKey | string,
  logoUrl?: string,
  isNative?: boolean,
  isCollateral?: boolean
): null | Token => {
  try {
    if (cachedToken[address.toString()]) return cachedToken[address.toString()];
    const token = new Token(
      name,
      symbol,
      decimal,
      address,
      logoUrl,
      isNative,
      isCollateral
    );
    cachedToken[address.toString()] = token;
    return token;
  } catch (err) {
    console.error(err);
    return null;
  }
};
