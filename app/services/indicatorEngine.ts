import {
  EMA,
  RSI,
  MACD,
  ATR,
  ADX,
} from "technicalindicators";

export interface IndicatorResult {
  ema20: number;
  ema50: number;
  ema200: number;

  rsi: number;

  macd: number;
  macdSignal: number;
  macdHistogram: number;

  atr: number;

  adx: number;

  trend: "Bullish" | "Bearish" | "Sideways";
}

export function calculateIndicators(
  highs: number[],
  lows: number[],
  closes: number[]
): IndicatorResult {

  const ema20 =
    EMA.calculate({
      period: 20,
      values: closes,
    }).at(-1) ?? 0;

  const ema50 =
    EMA.calculate({
      period: 50,
      values: closes,
    }).at(-1) ?? 0;

  const ema200 =
    EMA.calculate({
      period: 200,
      values: closes,
    }).at(-1) ?? 0;

  const rsi =
    RSI.calculate({
      values: closes,
      period: 14,
    }).at(-1) ?? 50;

  const macd =
    MACD.calculate({
      values: closes,
      fastPeriod: 12,
      slowPeriod: 26,
      signalPeriod: 9,
      SimpleMAOscillator: false,
      SimpleMASignal: false,
    }).at(-1);

  const atr =
    ATR.calculate({
      high: highs,
      low: lows,
      close: closes,
      period: 14,
    }).at(-1) ?? 0;

  const adx =
    ADX.calculate({
      high: highs,
      low: lows,
      close: closes,
      period: 14,
    }).at(-1);

  let trend: "Bullish" | "Bearish" | "Sideways" =
    "Sideways";

  if (ema20 > ema50 && ema50 > ema200)
    trend = "Bullish";

  if (ema20 < ema50 && ema50 < ema200)
    trend = "Bearish";

  return {

    ema20,

    ema50,

    ema200,

    rsi,

    macd: macd?.MACD ?? 0,

    macdSignal: macd?.signal ?? 0,

    macdHistogram: macd?.histogram ?? 0,

    atr,

    adx: adx?.adx ?? 0,

    trend,

  };
}