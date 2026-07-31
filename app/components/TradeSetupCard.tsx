"use client";

import { useAnalysisContext } from "../context/AnalysisContext";

export default function TradeSetupCard() {
  const { data, loading } = useAnalysisContext();

  if (loading || !data) {
    return (
      <div className="bg-slate-900 rounded-2xl p-6">
        Loading Trade Setup...
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-700">

      <h2 className="text-xl font-bold text-cyan-400 mb-5">
        📈 Trade Setup
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <div>
          <p className="text-slate-400 text-sm">Entry</p>
          <h2 className="text-2xl font-bold">
            {data.entry.toFixed(2)}
          </h2>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Stop Loss</p>
          <h2 className="text-2xl font-bold text-red-400">
            {data.stopLoss.toFixed(2)}
          </h2>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Take Profit 1</p>
          <h2 className="text-2xl font-bold text-green-400">
            {data.takeProfit1.toFixed(2)}
          </h2>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Take Profit 2</p>
          <h2 className="text-2xl font-bold text-green-500">
            {data.takeProfit2.toFixed(2)}
          </h2>
        </div>

      </div>

    </div>
  );
}