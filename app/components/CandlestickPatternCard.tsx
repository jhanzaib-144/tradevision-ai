"use client";

import { useAnalysisContext } from "../context/AnalysisContext";

export default function CandlestickPatternCard() {
  const { data, loading } = useAnalysisContext();

  if (loading || !data) {
    return (
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
        Loading Candlestick Analysis...
      </div>
    );
  }

  const biasColor =
    data.patternBias === "BUY"
      ? "text-green-400"
      : data.patternBias === "SELL"
      ? "text-red-400"
      : "text-yellow-400";

  const progressColor =
    data.patternReliability >= 80
      ? "bg-green-500"
      : data.patternReliability >= 60
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-700 p-6 shadow-lg">

      <h2 className="text-xl font-bold text-cyan-400 mb-6">
        🕯️ Candlestick Analysis
      </h2>

      <div className="space-y-5">

        <div>
          <p className="text-slate-400 text-sm">Latest Pattern</p>
          <h2 className="text-3xl font-bold mt-2">
            {data.pattern}
          </h2>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Market Bias</p>

          <h2 className={`text-2xl font-bold mt-2 ${biasColor}`}>
            {data.patternBias}
          </h2>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span>Reliability</span>
            <span>{data.patternReliability}%</span>
          </div>

          <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`${progressColor} h-3 rounded-full`}
              style={{
                width: `${data.patternReliability}%`,
              }}
            />
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">

          <p className="text-slate-300 leading-7">

            {data.patternBias === "BUY" &&
              "Buying pressure is increasing. Wait for confirmation before entering the trade."}

            {data.patternBias === "SELL" &&
              "Selling pressure is increasing. Watch for bearish continuation before entering."}

            {data.patternBias === "WAIT" &&
              "No strong candlestick signal has formed yet. Waiting for confirmation is recommended."}

          </p>

        </div>

      </div>

    </div>
  );
}