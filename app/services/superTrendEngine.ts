import { ATR } from "technicalindicators";

export interface SuperTrendResult {
  superTrend: number;
  direction: "BUY" | "SELL";
  trend: "BULLISH" | "BEARISH";
}

export function calculateSuperTrend(
  highs: number[],
  lows: number[],
  closes: number[],
  period = 10,
  multiplier = 3
): SuperTrendResult {

  const atr = ATR.calculate({
    high: highs,
    low: lows,
    close: closes,
    period,
  });

  const atrValue = atr.at(-1) ?? 5;

  const currentHigh = highs.at(-1)!;
  const currentLow = lows.at(-1)!;
  const currentClose = closes.at(-1)!;

  const hl2 = (currentHigh + currentLow) / 2;

  const upperBand = hl2 + multiplier * atrValue;
  const lowerBand = hl2 - multiplier * atrValue;

  let direction: "BUY" | "SELL";
  let trend: "BULLISH" | "BEARISH";
  let superTrend: number;

  if (currentClose >= upperBand) {
    direction = "BUY";
    trend = "BULLISH";
    superTrend = lowerBand;
  } else if (currentClose <= lowerBand) {
    direction = "SELL";
    trend = "BEARISH";
    superTrend = upperBand;
  } else {
    if (currentClose >= hl2) {
      direction = "BUY";
      trend = "BULLISH";
      superTrend = lowerBand;
    } else {
      direction = "SELL";
      trend = "BEARISH";
      superTrend = upperBand;
    }
  }

  return {
    superTrend: Number(superTrend.toFixed(2)),
    direction,
    trend,
  };
}