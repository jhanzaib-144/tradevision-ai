import { calculateConfidence } from "./confidenceEngine";
import { detectLiquiditySweep } from "./liquidityEngine";
import { calculateSignal } from "./signalEngine";
import { calculateRisk } from "./riskEngine";
import { analyzeSmartMoney } from "./smartMoney";
import { analyzeMultipleTimeframes } from "./multiTimeframe";
import { analyzeMarketStructure } from "./marketStructure";
export interface AIAnalysis {
  signal: "BUY" | "SELL" | "WAIT";
  confidence: number;

  decision: string;
  reason: string;

  trend: string;
  marketStructure: string;

  entry: number;
  stopLoss: number;

  takeProfit1: number;
  takeProfit2: number;
  takeProfit3: number;

  riskReward: number;
  riskLevel: string;

  support1: number;
  support2: number;

  resistance1: number;
  resistance2: number;

  ema20: number;
  ema50: number;

  rsi: number;
  atr: number;
  adx: number;

  upperBand: number;
  middleBand: number;
  lowerBand: number;
}

export function generateAIAnalysis(
  highs: number[],
  lows: number[],
  closes: number[]
): AIAnalysis {

  const signal = calculateSignal(
    highs,
    lows,
    closes
  );

  

  const smc = analyzeSmartMoney(
    highs,
    lows,
    closes
  );
  const liquidity = detectLiquiditySweep(
  highs,
  lows,
  closes
);
  const structure = analyzeMarketStructure(
  highs,
  lows,
  closes
);

  // Multi-TimeFrame Engine
const mtf = analyzeMultipleTimeframes([
  {
    timeframe: "M5",
    highs,
    lows,
    closes,
  },
  {
    timeframe: "M15",
    highs,
    lows,
    closes,
  },
  {
    timeframe: "H1",
    highs,
    lows,
    closes,
  },
  {
    timeframe: "H4",
    highs,
    lows,
    closes,
  },
]);

const confidence = calculateConfidence({
  indicatorScore: signal.confidence,
  trend: mtf.trend,
  adx: signal.adx,
  liquiditySweep: liquidity.liquidityGrab,
  marketStructure: smc.marketStructure,
  mtfConfidence: mtf.confidence,
});
const finalSignal = mtf.finalSignal;

const risk = calculateRisk(
  closes.at(-1)!,
  signal.atr,
  finalSignal
);

  return {
    signal: finalSignal,

    confidence,

    decision: signal.decision,

    reason:
  signal.reason +
  (liquidity.liquidityGrab
    ? ` Liquidity Sweep: ${liquidity.reason}`
    : ""),

    trend:
  structure.trend === "Sideways"
    ? mtf.trend
    : structure.trend,

    marketStructure:
  structure.structure + " • " + smc.marketStructure,

    entry: risk.entry,
    stopLoss: risk.stopLoss,

    takeProfit1: risk.takeProfit1,
    takeProfit2: risk.takeProfit2,
    takeProfit3: risk.takeProfit3,

    riskReward: risk.riskReward,
    riskLevel: risk.riskLevel,

    support1: signal.support1,
    support2: signal.support2,

    resistance1: signal.resistance1,
    resistance2: signal.resistance2,

    ema20: signal.ema20,
    ema50: signal.ema50,

    rsi: signal.rsi,
    atr: signal.atr,
    adx: signal.adx,

    upperBand: signal.upperBand,
    middleBand: signal.middleBand,
    lowerBand: signal.lowerBand,
  };
}