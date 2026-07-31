import {
  EMA,
  RSI,
  MACD,
  ATR,
  ADX,
  BollingerBands,
} from "technicalindicators";

export interface SignalResult {
  signal: "BUY" | "SELL" | "WAIT";

  confidence: number;

  ema20: number;
  ema50: number;

  rsi: number;
  atr: number;
  adx: number;

  support1: number;
  support2: number;

  resistance1: number;
  resistance2: number;

  upperBand: number;
  middleBand: number;
  lowerBand: number;

  decision: string;
  reason: string;
  risk: string;
}

export function calculateSignal(
  highs: number[],
  lows: number[],
  closes: number[]
): SignalResult {

  // ===========================
  // Indicators
  // ===========================

  const ema20 = EMA.calculate({
    period: 20,
    values: closes,
  });

  const ema50 = EMA.calculate({
    period: 50,
    values: closes,
  });

  const rsi = RSI.calculate({
    period: 14,
    values: closes,
  });

  const macd = MACD.calculate({
    values: closes,
    fastPeriod: 12,
    slowPeriod: 26,
    signalPeriod: 9,
    SimpleMAOscillator: false,
    SimpleMASignal: false,
  });

  const atr = ATR.calculate({
    high: highs,
    low: lows,
    close: closes,
    period: 14,
  });

  const adx = ADX.calculate({
    high: highs,
    low: lows,
    close: closes,
    period: 14,
  });

  const bb = BollingerBands.calculate({
    period: 20,
    stdDev: 2,
    values: closes,
  });

  // ===========================
  // Latest Values
  // ===========================

  const lastEMA20 = ema20.at(-1) ?? closes.at(-1)!;
  const lastEMA50 = ema50.at(-1) ?? closes.at(-1)!;

  const lastRSI = rsi.at(-1) ?? 50;

  const lastMACD = macd.at(-1);

  const lastATR = atr.at(-1) ?? 5;

  const lastADX =
    adx.length > 0
      ? adx[adx.length - 1].adx
      : 20;

  const lastBB = bb.at(-1);

  const upperBand = lastBB?.upper ?? closes.at(-1)!;

  const middleBand = lastBB?.middle ?? closes.at(-1)!;

  const lowerBand = lastBB?.lower ?? closes.at(-1)!;

  const currentPrice = closes.at(-1)!;

  // ===========================
  // Support & Resistance
  // ===========================

  const recentHighs = highs.slice(-20);

  const recentLows = lows.slice(-20);

  const resistance1 = Math.max(...recentHighs);

  const support1 = Math.min(...recentLows);

  const resistance2 = resistance1 + lastATR;

  const support2 = support1 - lastATR;

  // ===========================
  // AI Score
  // ===========================

  let score = 50;

  // EMA Trend

  if (lastEMA20 > lastEMA50)
    score += 30;
  else
    score -= 30;

  // RSI

  if (lastRSI < 30)
    score += 15;
  else if (lastRSI > 70)
    score -= 15;

  // MACD

  if ((lastMACD?.histogram ?? 0) > 0)
    score += 15;
  else
    score -= 15;

  // ADX

  if (lastADX >= 25)
    score += 10;
  else
    score -= 10;

  // Bollinger Bands

  if (currentPrice <= lowerBand)
    score += 10;
  else if (currentPrice >= upperBand)
    score -= 10;

  // Limit score

  score = Math.max(0, Math.min(100, score));

  // ===========================
  // Final Signal
  // ===========================

  let signal: "BUY" | "SELL" | "WAIT" = "WAIT";

  if (score >= 70)
    signal = "BUY";
  else if (score <= 30)
    signal = "SELL";
  let decision = "";
let reason = "";
let risk = "";

// Decision
if (signal === "BUY") {
  decision = score >= 85 ? "STRONG BUY" : "BUY";
}

if (signal === "SELL") {
  decision = score <= 15 ? "STRONG SELL" : "SELL";
}

if (signal === "WAIT") {
  decision = "WAIT";
}

// Reason
const reasons: string[] = [];

if (lastEMA20 > lastEMA50)
  reasons.push("EMA20 is above EMA50 (Bullish Trend)");
else
  reasons.push("EMA20 is below EMA50 (Bearish Trend)");

if ((lastMACD?.histogram ?? 0) > 0)
  reasons.push("MACD Momentum is Bullish");
else
  reasons.push("MACD Momentum is Bearish");

if (lastADX >= 25)
  reasons.push("ADX confirms a strong trend");
else
  reasons.push("ADX indicates a weak trend");

if (lastRSI < 30)
  reasons.push("RSI is Oversold");

if (lastRSI > 70)
  reasons.push("RSI is Overbought");

if (currentPrice <= lowerBand)
  reasons.push("Price is near Lower Bollinger Band");

if (currentPrice >= upperBand)
  reasons.push("Price is near Upper Bollinger Band");

reason = reasons.join(". ");

// Risk
if (lastATR > 10)
  risk = "High";
else if (lastATR > 5)
  risk = "Medium";
else
  risk = "Low";

  // ===========================
  // Return
  // ===========================

  return {
    signal,

    confidence: score,

    ema20: Number(lastEMA20.toFixed(2)),
    ema50: Number(lastEMA50.toFixed(2)),

    rsi: Number(lastRSI.toFixed(2)),

    atr: Number(lastATR.toFixed(2)),

    adx: Number(lastADX.toFixed(2)),

    support1: Number(support1.toFixed(2)),
    support2: Number(support2.toFixed(2)),

    resistance1: Number(resistance1.toFixed(2)),
    resistance2: Number(resistance2.toFixed(2)),

    upperBand: Number(upperBand.toFixed(2)),
    middleBand: Number(middleBand.toFixed(2)),
    lowerBand: Number(lowerBand.toFixed(2)),
    decision,

reason,

risk,
  };
}