export interface VWAPResult {
  vwap: number;

  position: "ABOVE" | "BELOW";

  bias: "BULLISH" | "BEARISH";
}

export function calculateVWAP(
  highs: number[],
  lows: number[],
  closes: number[],
  volumes?: number[]
): VWAPResult {

  let cumulativePV = 0;

  let cumulativeVolume = 0;

  for (let i = 0; i < closes.length; i++) {

    const typicalPrice =
      (highs[i] + lows[i] + closes[i]) / 3;

    const volume =
      volumes?.[i] ?? 1;

    cumulativePV +=
      typicalPrice * volume;

    cumulativeVolume += volume;

  }

  const vwap =
    cumulativePV / cumulativeVolume;

  const currentPrice =
    closes.at(-1)!;

  const position =
    currentPrice >= vwap
      ? "ABOVE"
      : "BELOW";

  const bias =
    currentPrice >= vwap
      ? "BULLISH"
      : "BEARISH";

  return {

    vwap: Number(vwap.toFixed(2)),

    position,

    bias,

  };

}