"use client";

import { useAnalysisContext } from "../context/AnalysisContext";

export default function AIDecisionCard() {
  const { data, loading } = useAnalysisContext();

  if (loading || !data) {
    return (
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700 mt-8">
        Loading AI Decision...
      </div>
    );
  }

  const reasons = [];

  if (data.ema20 > data.ema50)
    reasons.push("EMA20 is above EMA50 (Bullish Trend)");
  else
    reasons.push("EMA20 is below EMA50 (Bearish Trend)");

  if (data.rsi < 30)
    reasons.push("RSI indicates Oversold conditions");
  else if (data.rsi > 70)
    reasons.push("RSI indicates Overbought conditions");
  else
    reasons.push("RSI is in a healthy range");

  reasons.push(`Market Trend: ${data.trend}`);

  const signalColor =
    data.signal === "BUY"
      ? "bg-green-500"
      : data.signal === "SELL"
      ? "bg-red-500"
      : "bg-yellow-500";

  const risk =
    data.confidence >= 85
      ? "Low"
      : data.confidence >= 65
      ? "Medium"
      : "High";

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-700 p-6 mt-8 shadow-lg">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-cyan-400">
          🧠 AI Decision Engine
        </h2>

        <span
          className={`px-4 py-2 rounded-full font-bold text-white ${signalColor}`}
        >
          {data.signal}
        </span>
      </div>

      {/* Confidence */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span>Confidence</span>
          <span>{data.confidence}%</span>
        </div>

        <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-700"
            style={{ width: `${data.confidence}%` }}
          />
        </div>
      </div>

      {/* Analysis */}
      <div className="space-y-3">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className="bg-slate-800 rounded-lg p-3 border border-slate-700"
          >
            {reason}
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 grid grid-cols-2 gap-4">

        <div className="bg-slate-800 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Risk Level</p>
          <h2 className="text-xl font-bold text-yellow-400">
            {risk}
          </h2>
        </div>

        <div className="bg-slate-800 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Trend</p>
          <h2 className="text-xl font-bold text-cyan-400">
            {data.trend}
          </h2>
        </div>

      </div>

      {/* Recommendation */}
      <div className="mt-8 border-t border-slate-700 pt-6">

        <h3 className="text-lg font-bold text-green-400 mb-2">
          AI Recommendation
        </h3>

        <p className="text-slate-300 leading-7">
          {data.signal === "BUY" &&
            "Market momentum is bullish. Consider entering near the suggested entry price and manage risk using the recommended stop loss."}

          {data.signal === "SELL" &&
            "Market momentum is bearish. Short positions may be considered while respecting the stop loss."}

          {data.signal === "WAIT" &&
            "The current market lacks a strong directional edge. Waiting for additional confirmation may reduce unnecessary risk."}
        </p>

      </div>

    </div>
  );
}