export interface Candle {
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface PatternResult {
  pattern: string;
  bias: "BUY" | "SELL" | "WAIT";
  reliability: number;
}

export function detectPattern(candles: Candle[]): PatternResult {
  if (candles.length < 2) {
    return {
      pattern: "Not enough data",
      bias: "WAIT",
      reliability: 0,
    };
  }

  const prev = candles[candles.length - 2];
  const curr = candles[candles.length - 1];

  // Bullish Engulfing
  if (
    prev.close < prev.open &&
    curr.close > curr.open &&
    curr.open < prev.close &&
    curr.close > prev.open
  ) {
    return {
      pattern: "Bullish Engulfing",
      bias: "BUY",
      reliability: 90,
    };
  }

  // Bearish Engulfing
  if (
    prev.close > prev.open &&
    curr.close < curr.open &&
    curr.open > prev.close &&
    curr.close < prev.open
  ) {
    return {
      pattern: "Bearish Engulfing",
      bias: "SELL",
      reliability: 90,
    };
  }

  const body = Math.abs(curr.close - curr.open);
  const upperShadow = curr.high - Math.max(curr.close, curr.open);
  const lowerShadow = Math.min(curr.close, curr.open) - curr.low;

  // Hammer
  if (
    lowerShadow > body * 2 &&
    upperShadow < body
  ) {
    return {
      pattern: "Hammer",
      bias: "BUY",
      reliability: 80,
    };
  }

  // Shooting Star
  if (
    upperShadow > body * 2 &&
    lowerShadow < body
  ) {
    return {
      pattern: "Shooting Star",
      bias: "SELL",
      reliability: 80,
    };
  }

  // Doji
  if (body <= (curr.high - curr.low) * 0.1) {
    return {
      pattern: "Doji",
      bias: "WAIT",
      reliability: 60,
    };
  }

  return {
    pattern: "No Clear Pattern",
    bias: "WAIT",
    reliability: 50,
  };
}