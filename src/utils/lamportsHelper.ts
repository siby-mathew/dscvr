import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import Decimal from "decimal.js";
import { BigIntish } from "..";

Decimal.set({ precision: 35, rounding: 1 });

/**
 * Converts a raw amount (in lamports) to a decimal value (in readable format) based on the specified decimals.
 * @param value - The raw amount to convert.
 * @param decimals - The number of decimal places.
 * @returns  The converted decimal value.
 */
export const fromReadableValuesFromDecimals = (
  value: BigIntish,
  decimals?: BigIntish
) => {
  const valueInNumber = Number(value);
  const decimalsNumber = Number(decimals);

  // Check if they are valid numbers
  if (!Number.isNaN(valueInNumber)) {
    // Adjust balance by dividing by 10^decimals
    const divisor = decimalsNumber
      ? new Decimal(10).pow(decimalsNumber)
      : LAMPORTS_PER_SOL;

    const convertedValue = new Decimal(valueInNumber).dividedBy(divisor);

    return convertedValue;
  }
  return new Decimal(0);
};

/**
 * Converts a value (readable number) to a raw amount (in lamports) based on the specified decimals.
 * @param value - The decimal value to convert.
 * @param decimals - The number of decimal places.
 * @returns The converted raw amount as a string without decimal points (if decimal is >= 0.5 round off to next value).
 */
export const convertReadableValuesToDecimals = (
  value: BigIntish,
  decimals?: BigIntish
): string => {
  const valueInNumber = Number(value);
  const decimalsNumber = Number(decimals);

  // Check if they are valid numbers
  if (!Number.isNaN(valueInNumber)) {
    const valueDecimal = new Decimal(valueInNumber);
    // Multiply value by 10^decimals
    const multiplier = decimalsNumber
      ? new Decimal(10).pow(decimalsNumber)
      : LAMPORTS_PER_SOL;

    const rawAmount = valueDecimal.times(multiplier);

    return rawAmount.toFixed(0);
  }
  return "0";
};
