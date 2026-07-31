"use client";

import { useAnalysisContext } from "../context/AnalysisContext";

export default function SupportResistanceCard() {
  const { data, loading } = useAnalysisContext();

  if (loading || !data) {
    return (
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
        Loading Support & Resistance...
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-700">

      <h2 className="text-xl font-bold text-cyan-400 mb-6">
        📊 Support & Resistance
      </h2>

      <div className="space-y-4">

        <div>
          <p className="text-red-400 text-sm">Resistance 2</p>
          <h2 className="text-2xl font-bold">
            {data.resistance2.toFixed(2)}
          </h2>
        </div>

        <div>
          <p className="text-red-300 text-sm">Resistance 1</p>
          <h2 className="text-2xl font-bold">
            {data.resistance1.toFixed(2)}
          </h2>
        </div>

        <div className="border-y border-slate-700 py-4">
          <p className="text-cyan-400 text-sm">
            Current Price
          </p>

          <h2 className="text-3xl font-bold">
            {data.currentPrice.toFixed(2)}
          </h2>
        </div>

        <div>
          <p className="text-green-300 text-sm">Support 1</p>
          <h2 className="text-2xl font-bold">
            {data.support1.toFixed(2)}
          </h2>
        </div>

        <div>
          <p className="text-green-400 text-sm">Support 2</p>
          <h2 className="text-2xl font-bold">
            {data.support2.toFixed(2)}
          </h2>
        </div>

      </div>

    </div>
  );
}