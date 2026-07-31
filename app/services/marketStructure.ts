export interface MarketStructureResult {
  trend: "Bullish" | "Bearish" | "Sideways";
  structure: string;
  lastHigh: number;
  lastLow: number;
}

export function analyzeMarketStructure(
  highs: number[],
  lows: number[],
  closes: number[]
): MarketStructureResult {

  const recentHighs = highs.slice(-10);
  const recentLows = lows.slice(-10);

  const lastHigh = Math.max(...recentHighs);
  const lastLow = Math.min(...recentLows);

  const current = closes.at(-1)!;

  let trend: "Bullish" | "Bearish" | "Sideways" = "Sideways";
  let structure = "Range";

  if (current > lastHigh) {
    trend = "Bullish";
    structure = "Break Of Structure (BOS)";
  }

  else if (current < lastLow) {
    trend = "Bearish";
    structure = "Break Of Structure (BOS)";
  }

  else if (current > closes.at(-2)!) {
    trend = "Bullish";
    structure = "Higher High";
  }

  else if (current < closes.at(-2)!) {
    trend = "Bearish";
    structure = "Lower Low";
  }

  return {
    trend,
    structure,
    lastHigh,
    lastLow,
  };
}