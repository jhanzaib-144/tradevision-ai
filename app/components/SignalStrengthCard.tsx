"use client";

import { useAnalysisContext } from "../context/AnalysisContext";

export default function SignalStrengthCard() {
  const { data, loading } = useAnalysisContext();

  if (loading || !data) {
    return (
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
        Loading Signal Strength...
      </div>
    );
  }

  const percentage = Math.min(100, Math.max(0, data.confidence));

  const color =
    percentage >= 80
      ? "bg-green-500"
      : percentage >= 60
      ? "bg-yellow-500"
      : "bg-red-500";

  const text =
    percentage >= 80
      ? "Strong Signal"
      : percentage >= 60
      ? "Moderate Signal"
      : "Weak Signal";

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-700 p-6">

      <h2 className="text-xl font-bold text-cyan-400 mb-6">
        📊 Signal Strength
      </h2>

      <div className="text-center">

        <h1 className="text-5xl font-bold mb-4">
          {percentage}%
        </h1>

        <div className="w-full bg-slate-700 rounded-full h-5 overflow-hidden">

          <div
            className={`${color} h-5 rounded-full transition-all duration-700`}
            style={{ width: `${percentage}%` }}
          />

        </div>

        <p className="mt-5 text-xl font-semibold text-white">
          {text}
        </p>

      </div>

    </div>
  );
}