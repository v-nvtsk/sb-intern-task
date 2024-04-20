export type Currency = {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
  type: string;
  countries: string[];
};

export type Currencies = {
  [key: string]: Currency;
};

export type CurrencyRate = {
  code: string;
  value: number;
};

export type CurrencyRates = {
  [key: string]: CurrencyRate;
};
