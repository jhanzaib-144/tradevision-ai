"use client";

import { useAnalysisContext } from "../context/AnalysisContext";

export default function PriceCard() {
  const { data, loading } = useAnalysisContext();

  if (loading || !data) {
    return (
      <div className="bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-700">
        <h2 className="text-yellow-400 text-xl font-bold">
          🟡 Live Gold Price
        </h2>

        <p className="mt-6 text-slate-400">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-700">

      <h2 className="text-yellow-400 text-xl font-bold">
        🟡 Live Gold Price
      </h2>

      <h1 className="text-5xl mt-6 font-bold text-white">
        ${data.currentPrice.toFixed(2)}
      </h1>

      <p className="mt-4 text-green-400">
        Updated: {new Date(data.lastUpdated).toLocaleTimeString()}
      </p>

    </div>
  );
}