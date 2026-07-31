"use client";

import { useAnalysisContext } from "../context/AnalysisContext";

export default function SignalCard() {
  const { data, loading } = useAnalysisContext();

  if (loading || !data) {
    return (
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
        <h2 className="text-xl font-bold">🤖 AI Signal</h2>
        <p className="mt-6 text-slate-400">Loading...</p>
      </div>
    );
  }

  const signalColor =
    data.signal === "BUY"
      ? "text-green-400"
      : data.signal === "SELL"
      ? "text-red-400"
      : "text-yellow-400";

  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">

      <h2 className="text-xl font-bold mb-5">
        🤖 AI Signal
      </h2>

      <h1 className={`text-5xl font-bold ${signalColor}`}>
        {data.signal}
      </h1>

      <div className="mt-6 space-y-3">

        <div className="flex justify-between">
          <span>Confidence</span>
          <span className="text-cyan-400">{data.confidence}%</span>
        </div>

        <div className="flex justify-between">
          <span>EMA20</span>
          <span>{data.ema20.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>EMA50</span>
          <span>{data.ema50.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>RSI</span>
          <span>{data.rsi.toFixed(2)}</span>
        </div>

      </div>

      <p className="text-xs text-slate-500 mt-6">
        Updated {new Date(data.lastUpdated).toLocaleTimeString()}
      </p>

    </div>
  );
}