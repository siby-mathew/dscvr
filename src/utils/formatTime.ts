// Formatting all number values for the app. We use Intl for formatting

import Decimal from "decimal.js";

import { Nullish, NumberType } from "..";

// each rule must contain either an `upperBound` or an `exact` value.
// upperBound => number will use that formatter as long as it is < upperBound
// exact => number will use that formatter if it is === exact
// if hardcodedinput is supplied it will override the input value or use the hardcoded output

// Set en-US until browser local is supported
const locale = "en-US";

const subscripts = "₀₁₂₃₄₅₆₇₈₉";

type NumberFormatOptions = Intl.NumberFormatOptions;

type HardCodedInputFormat =
  | {
      hardcodedOutput: string;
      input?: undefined;
      prefix?: undefined;
    }
  | {
      hardcodedOutput?: undefined;
      input: number;
      prefix?: string;
    }
  | {
      hardcodedOutput?: undefined;
      input?: undefined;
      prefix?: undefined;
    };

type FormatterBaseRule = { formatterOptions: NumberFormatOptions };
type FormatterExactRule = {
  exact: number;
  upperBound?: undefined;
} & FormatterBaseRule;
type FormatterUpperBoundRule = {
  exact?: undefined;
  upperBound: number;
} & FormatterBaseRule;

type FormatterRule = {
  customFormatter?: (value: string) => string;
  hardCodedInput?: HardCodedInputFormat;
} & (FormatterExactRule | FormatterUpperBoundRule);

const NO_DECIMALS: NumberFormatOptions = {
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
  notation: "standard",
};

const SHORTHAND_SIX_DECIMALS: NumberFormatOptions = {
  maximumFractionDigits: 6,
  notation: "compact",
};

const FOUR_DECIMALS: NumberFormatOptions = {
  maximumFractionDigits: 4,
  notation: "standard",
};

const SHORTHAND_THREE_DECIMALS: NumberFormatOptions = {
  maximumFractionDigits: 3,
  notation: "compact",
};

const NINE_DECIMALS: NumberFormatOptions = {
  maximumFractionDigits: 9,
  notation: "standard",
};

const FIVE_DECIMALS_MAX_TWO_DECIMALS_MIN: NumberFormatOptions = {
  maximumFractionDigits: 5,
  minimumFractionDigits: 2,
  notation: "standard",
};

const EIGHT_SIG_FIGS_NO_COMMAS: NumberFormatOptions = {
  maximumSignificantDigits: 8,
  notation: "standard",
  useGrouping: false,
};

// const TEN_DECIMALS_MAX_TWO_DECIMALS_MIN_NO_COMMAS: NumberFormatOptions = {
//   maximumFractionDigits: 10,
//   minimumFractionDigits: 2,
//   notation: 'standard',
//   useGrouping: false,
// };

const TEN_SIG_FIGS_SIX_DECIMALS_NO_COMMAS: NumberFormatOptions = {
  maximumFractionDigits: 6,
  maximumSignificantDigits: 10,
  minimumFractionDigits: 2,
  minimumSignificantDigits: 3,
  notation: "standard",
  useGrouping: false,
};

function formatNumberWithSubscript(input: string) {
  const numberInput = Number(input);
  if (!numberInput) return "";
  const [integerPart, decimalPart] = input.split(".");

  if (!decimalPart || decimalPart.length <= 2) {
    return numberInput.toString();
  }

  let leadingZeros = 0;
  for (const char of decimalPart) {
    if (char === "0") {
      leadingZeros += 1;
    } else {
      break;
    }
  }

  if (leadingZeros < 2) {
    return numberInput.toString();
  }

  const subscriptZeros = Array.from(
    String(leadingZeros),
    (digit) => subscripts[Number(digit)]
  ).join("");
  const remainingDecimals = decimalPart.slice(leadingZeros, leadingZeros + 2);

  return `${integerPart}.0${subscriptZeros}${remainingDecimals}`;
}

// token balance
const tokenBalanceFormatter: FormatterRule[] = [
  { exact: 0, formatterOptions: NO_DECIMALS },
  {
    formatterOptions: NINE_DECIMALS,
    hardCodedInput: { input: 0.0001, prefix: "<" },
    upperBound: 0.0001,
  },
  { formatterOptions: SHORTHAND_SIX_DECIMALS, upperBound: 1e10 },
  {
    formatterOptions: SHORTHAND_SIX_DECIMALS,
    hardCodedInput: { input: 999_000_000_000, prefix: ">" },
    upperBound: Infinity,
  },
];

const tableDataFormatter: FormatterRule[] = [
  {
    exact: 0,
    formatterOptions: NO_DECIMALS,
    hardCodedInput: { hardcodedOutput: "-" },
  },
  {
    formatterOptions: FOUR_DECIMALS,
    hardCodedInput: { input: 0.001, prefix: "<" },
    upperBound: 0.001,
  },
  { formatterOptions: SHORTHAND_THREE_DECIMALS, upperBound: 1e10 },
  {
    formatterOptions: SHORTHAND_THREE_DECIMALS,
    hardCodedInput: { input: 999_000_000_000_000, prefix: ">" },
    upperBound: Infinity,
  },
];
// for headers
const txDisplayValuesFormatterWithSubscript: FormatterRule[] = [
  {
    exact: 0,
    formatterOptions: NO_DECIMALS,
    hardCodedInput: { hardcodedOutput: "-" },
  },
  {
    customFormatter: formatNumberWithSubscript,
    formatterOptions: NINE_DECIMALS,
    upperBound: 0.01,
  },
  { formatterOptions: SHORTHAND_THREE_DECIMALS, upperBound: 1e10 },
  {
    formatterOptions: SHORTHAND_THREE_DECIMALS,
    hardCodedInput: { input: 999_000_000_000_000, prefix: ">" },
    upperBound: Infinity,
  },
];

// tokens transaction (tokens values, slippage, cost to deploy, price per tokens etc)
const txValuesFormatter: FormatterRule[] = [
  {
    exact: 0,
    formatterOptions: NO_DECIMALS,
    hardCodedInput: { hardcodedOutput: "-" },
  },
  {
    formatterOptions: FIVE_DECIMALS_MAX_TWO_DECIMALS_MIN,
    hardCodedInput: { input: 0.00001, prefix: "<" },
    upperBound: 0.00001,
  },
  { formatterOptions: SHORTHAND_SIX_DECIMALS, upperBound: 1e10 },
  {
    formatterOptions: SHORTHAND_SIX_DECIMALS,
    hardCodedInput: { input: 100_000_000_00, prefix: ">" },
    upperBound: Infinity,
  },
];

const swapTradeAmountFormatter: FormatterRule[] = [
  { exact: 0, formatterOptions: NO_DECIMALS },
  { formatterOptions: EIGHT_SIG_FIGS_NO_COMMAS, upperBound: 0.1 },
  { formatterOptions: TEN_SIG_FIGS_SIX_DECIMALS_NO_COMMAS, upperBound: 1 },
  {
    formatterOptions: TEN_SIG_FIGS_SIX_DECIMALS_NO_COMMAS,
    upperBound: Infinity,
  },
];

// if we want to display the full value (yet to be completed : formatter function for <0.000001)
const txFullDisplayValuesFormatter: FormatterRule[] = [
  {
    exact: 0,
    formatterOptions: NO_DECIMALS,
    hardCodedInput: { hardcodedOutput: "-" },
  },
  //   {
  //     formatterOptions: THREE_DECIMALS,
  //     hardCodedInput: { input: 0.001, prefix: '<' },
  //     upperBound: 0.00001,
  //   },
  { formatterOptions: FOUR_DECIMALS, upperBound: 1e10 },
  {
    formatterOptions: FOUR_DECIMALS,
    hardCodedInput: { input: 999_000_000_000_000, prefix: ">" },
    upperBound: Infinity,
  },
];

export enum NumberFormatType {
  SwapTradeAmountFormatter = "swap-trade-amount-formatter",
  TableDataFormatter = "table-data-formatter",
  TokenBalanceFormatter = "token-balance-formatter",
  TxDisplayValuesFormatterWithSubscript = "tx-display-values-formatter-subscript",
  TxFullDisplayValuesFormatter = "tx-full-display-values-formatter",
  TxValuesFormatter = "token-tx-values-formatter",
}

type FormatterType = FormatterRule[] | NumberFormatType;

const TYPE_TO_FORMATTER_RULES = {
  [NumberFormatType.SwapTradeAmountFormatter]: swapTradeAmountFormatter,
  [NumberFormatType.TableDataFormatter]: tableDataFormatter,
  [NumberFormatType.TokenBalanceFormatter]: tokenBalanceFormatter,
  [NumberFormatType.TxDisplayValuesFormatterWithSubscript]:
    txDisplayValuesFormatterWithSubscript,
  [NumberFormatType.TxFullDisplayValuesFormatter]: txFullDisplayValuesFormatter,
  [NumberFormatType.TxValuesFormatter]: txValuesFormatter,
};

function getFormatterRule(
  input: number,
  type: FormatterType
  //   conversionRate?: number
): FormatterRule {
  const rules = Array.isArray(type) ? type : TYPE_TO_FORMATTER_RULES[type];
  for (const rule of rules) {
    if (
      (rule.exact !== undefined && input === rule.exact) ||
      (rule.upperBound !== undefined && input <= rule.upperBound)
    ) {
      return rule;
    }
  }

  throw new Error(
    `formatter for type ${type} not configured correctly for value ${input}`
  );
}

interface FormatNumberOptions {
  input: Nullish<NumberType>;
  placeholder?: string;
  suffix?: string;
  type: FormatterType;
  // locale?: SupportedLocale
  // localCurrency?: SupportedLocalCurrency
  // conversionRate?: number
}

const getValueWithSuffixAndPrefix = (
  value: string,
  suffix: string = "",
  prefix: string = ""
) => `${prefix}${value}${suffix ? ` ${suffix}` : ""}`;

export const formatNumber = ({
  input,
  placeholder = "-",
  suffix,
  type,
}: FormatNumberOptions) => {
  if (
    input === null ||
    input === undefined ||
    Number.isNaN(input) ||
    (input instanceof Decimal && input.isNaN()) ||
    Number.isNaN(parseFloat(`${input}`))
  ) {
    return placeholder;
  }

  let numericInput: number;
  if (typeof input === "string") {
    numericInput = Number(input);
  } else if (input instanceof Decimal) numericInput = input.toNumber();
  else if (typeof input === "number") {
    numericInput = input;
  } else {
    throw new Error("Invalid input type");
  }

  const { customFormatter, formatterOptions, hardCodedInput } =
    getFormatterRule(numericInput, type);

  if (!hardCodedInput) {
    if (customFormatter) {
      const formattedValue = new Intl.NumberFormat(
        locale,
        formatterOptions
      ).format(numericInput);
      const customFormattedValue = customFormatter(formattedValue);
      return getValueWithSuffixAndPrefix(customFormattedValue, suffix);
    }
    return getValueWithSuffixAndPrefix(
      new Intl.NumberFormat(locale, formatterOptions).format(numericInput),
      suffix
    );
  }

  if (hardCodedInput.hardcodedOutput) {
    return placeholder !== "-" ? placeholder : hardCodedInput.hardcodedOutput;
  }

  const { input: hardCodedInputValue, prefix } = hardCodedInput;
  if (hardCodedInputValue === undefined) {
    return placeholder;
  }
  return getValueWithSuffixAndPrefix(
    new Intl.NumberFormat(locale, formatterOptions).format(hardCodedInputValue),
    suffix,
    prefix
  );
};

export function formatPercent(percent: NumberType | undefined) {
  if (!percent) {
    return "-";
  }

  let numericInput: number;
  if (typeof percent === "string") {
    numericInput = Number(percent);
  } else if (percent instanceof Decimal) numericInput = percent.toNumber();
  else if (typeof percent === "number") {
    numericInput = percent;
  } else {
    throw new Error("Invalid input type");
  }

  if (numericInput < 0.001 && numericInput > 0) return "<0.001%";

  return `${Number(numericInput).toLocaleString(locale, {
    maximumFractionDigits: 2,
    useGrouping: false,
  })}%`;
}
