export interface TimeframeData {
  timeframe: string;
  highs: number[];
  lows: number[];
  closes: number[];
}

export interface MultiTimeframeResult {
  finalSignal: "BUY" | "SELL" | "WAIT";
  confidence: number;
  trend: "Bullish" | "Bearish" | "Sideways";
}

export function analyzeMultipleTimeframes(
  frames: TimeframeData[]
): MultiTimeframeResult {

  let bullish = 0;
  let bearish = 0;

  for (const frame of frames) {

    const closes = frame.closes;

    if (closes.length < 20) continue;

    const ema20 =
      closes.slice(-20).reduce((a, b) => a + b, 0) / 20;

    const current = closes.at(-1)!;

    if (current > ema20)
      bullish++;
    else
      bearish++;

  }

  const total = bullish + bearish;

  if (total === 0) {
    return {
      finalSignal: "WAIT",
      confidence: 50,
      trend: "Sideways",
    };
  }

  const confidence = Math.round(
    (Math.max(bullish, bearish) / total) * 100
  );

  if (bullish > bearish) {
    return {
      finalSignal: "BUY",
      confidence,
      trend: "Bullish",
    };
  }

  if (bearish > bullish) {
    return {
      finalSignal: "SELL",
      confidence,
      trend: "Bearish",
    };
  }

  return {
    finalSignal: "WAIT",
    confidence: 50,
    trend: "Sideways",
  };
}