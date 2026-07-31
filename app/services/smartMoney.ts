export interface SmartMoneyResult {

  trend:
    | "BULLISH"
    | "BEARISH"
    | "SIDEWAYS";

  marketStructure:
    | "BOS"
    | "CHOCH"
    | "RANGE";

  higherHigh: boolean;

  higherLow: boolean;

  lowerHigh: boolean;

  lowerLow: boolean;

  demandZone: number;

  supplyZone: number;

}

export function analyzeSmartMoney(

  highs: number[],

  lows: number[],

  closes: number[]

): SmartMoneyResult {

  const lastHigh = highs.at(-1)!;
  const prevHigh = highs.at(-2)!;

  const lastLow = lows.at(-1)!;
  const prevLow = lows.at(-2)!;

  const higherHigh = lastHigh > prevHigh;

  const higherLow = lastLow > prevLow;

  const lowerHigh = lastHigh < prevHigh;

  const lowerLow = lastLow < prevLow;

  let trend:
    | "BULLISH"
    | "BEARISH"
    | "SIDEWAYS" = "SIDEWAYS";

  if (higherHigh && higherLow)
    trend = "BULLISH";

  if (lowerHigh && lowerLow)
    trend = "BEARISH";

  let marketStructure:
    | "BOS"
    | "CHOCH"
    | "RANGE" = "RANGE";

  if (higherHigh && higherLow)
    marketStructure = "BOS";

  if (higherHigh && lowerLow)
    marketStructure = "CHOCH";

  const demandZone =
    Math.min(...lows.slice(-20));

  const supplyZone =
    Math.max(...highs.slice(-20));

  return {

    trend,

    marketStructure,

    higherHigh,

    higherLow,

    lowerHigh,

    lowerLow,

    demandZone:
      Number(demandZone.toFixed(2)),

    supplyZone:
      Number(supplyZone.toFixed(2))

  };

}