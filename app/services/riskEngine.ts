export interface RiskResult {
  entry: number;

  stopLoss: number;

  takeProfit1: number;

  takeProfit2: number;

  takeProfit3: number;

  riskReward: number;

  riskLevel: "LOW" | "MEDIUM" | "HIGH";
}

export function calculateRisk(
  price: number,
  atr: number,
  signal: "BUY" | "SELL" | "WAIT"
): RiskResult {

  let entry = price;

  let stopLoss = price;

  let tp1 = price;

  let tp2 = price;

  let tp3 = price;

  if (signal === "BUY") {

    stopLoss = price - atr;

    tp1 = price + atr * 2;

    tp2 = price + atr * 4;

    tp3 = price + atr * 6;

  }

  if (signal === "SELL") {

    stopLoss = price + atr;

    tp1 = price - atr * 2;

    tp2 = price - atr * 4;

    tp3 = price - atr * 6;

  }

  const risk = Math.abs(entry - stopLoss);

  const reward = Math.abs(tp2 - entry);

  const riskReward =
    risk === 0
      ? 0
      : Number((reward / risk).toFixed(2));

  let riskLevel: "LOW" | "MEDIUM" | "HIGH" = "LOW";

  if (atr >= 15)
    riskLevel = "HIGH";

  else if (atr >= 7)
    riskLevel = "MEDIUM";

  return {

    entry,

    stopLoss,

    takeProfit1: tp1,

    takeProfit2: tp2,

    takeProfit3: tp3,

    riskReward,

    riskLevel,

  };

}