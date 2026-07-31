export interface ValidationInput {
  trend: string;
  signal: "BUY" | "SELL" | "WAIT";
  adx: number;
  rsi: number;
  liquidity: boolean;
  marketStructure: string;
  mtfTrend: string;
}

export interface ValidationResult {
  approved: boolean;
  score: number;
  reasons: string[];
}

export function validateSignal(
  input: ValidationInput
): ValidationResult {

  let score = 0;
  const reasons: string[] = [];

  // Trend alignment
  if (
    (input.signal === "BUY" && input.trend === "Bullish") ||
    (input.signal === "SELL" && input.trend === "Bearish")
  ) {
    score += 20;
    reasons.push("Trend aligned");
  }

  // ADX
  if (input.adx >= 25) {
    score += 20;
    reasons.push("Strong trend (ADX)");
  }

  // RSI
  if (
    input.signal === "BUY" &&
    input.rsi > 50 &&
    input.rsi < 70
  ) {
    score += 15;
    reasons.push("Healthy RSI for BUY");
  }

  if (
    input.signal === "SELL" &&
    input.rsi < 50 &&
    input.rsi > 30
  ) {
    score += 15;
    reasons.push("Healthy RSI for SELL");
  }

  // Market Structure
  if (input.marketStructure.includes("BOS")) {
    score += 20;
    reasons.push("Break Of Structure confirmed");
  }

  // Liquidity
  if (input.liquidity) {
    score += 15;
    reasons.push("Liquidity Sweep confirmed");
  }

  // Multi-Timeframe
  if (input.mtfTrend === input.trend) {
    score += 10;
    reasons.push("Multi-timeframe confirmation");
  }

  return {
    approved: score >= 70,
    score,
    reasons,
  };
}