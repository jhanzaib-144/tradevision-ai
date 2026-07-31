export interface LiquidityResult {
  liquidityGrab: boolean;
  direction: "BUY" | "SELL" | "NONE";
  reason: string;
}

export function detectLiquiditySweep(
  highs: number[],
  lows: number[],
  closes: number[]
): LiquidityResult {

  const previousHigh = Math.max(...highs.slice(-10, -1));
  const previousLow = Math.min(...lows.slice(-10, -1));

  const currentHigh = highs.at(-1)!;
  const currentLow = lows.at(-1)!;
  const currentClose = closes.at(-1)!;

  // Sell-side liquidity grab
  if (
    currentHigh > previousHigh &&
    currentClose < previousHigh
  ) {
    return {
      liquidityGrab: true,
      direction: "SELL",
      reason: "Buy-side liquidity taken above previous swing high.",
    };
  }

  // Buy-side liquidity grab
  if (
    currentLow < previousLow &&
    currentClose > previousLow
  ) {
    return {
      liquidityGrab: true,
      direction: "BUY",
      reason: "Sell-side liquidity taken below previous swing low.",
    };
  }

  return {
    liquidityGrab: false,
    direction: "NONE",
    reason: "No liquidity sweep detected.",
  };
}