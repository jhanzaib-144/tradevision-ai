export interface ConfidenceInput {
  indicatorScore: number;
  trend: string;
  adx: number;
  liquiditySweep: boolean;
  marketStructure: string;
  mtfConfidence: number;
}

export function calculateConfidence(
  input: ConfidenceInput
): number {

  let confidence = input.indicatorScore;

  // Strong trend bonus
  if (input.trend === "Bullish" || input.trend === "Bearish") {
    confidence += 5;
  }

  // Strong ADX bonus
  if (input.adx >= 30) {
    confidence += 5;
  }

  // Liquidity sweep bonus
  if (input.liquiditySweep) {
    confidence += 5;
  }

  // BOS bonus
  if (input.marketStructure.includes("BOS")) {
    confidence += 5;
  }

  // Multi-timeframe weighting
  confidence =
    (confidence + input.mtfConfidence) / 2;

  // Clamp to 0–100
  confidence = Math.max(0, Math.min(100, confidence));

  return Math.round(confidence);
}