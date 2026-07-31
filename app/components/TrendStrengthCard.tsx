"use client";

import { useAnalysisContext } from "../context/AnalysisContext";

export default function TrendStrengthCard() {
  const { data, loading } = useAnalysisContext();

  if (loading || !data) {
    return (
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
        Loading Trend Strength...
      </div>
    );
  }

  const adx = data.adx;

  const strength =
    adx >= 40
      ? "Very Strong"
      : adx >= 25
      ? "Strong"
      : adx >= 20
      ? "Moderate"
      : "Weak";

  const color =
    adx >= 40
      ? "text-green-400"
      : adx >= 25
      ? "text-cyan-400"
      : adx >= 20
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700 shadow-lg">

      <h2 className="text-xl font-bold text-cyan-400 mb-6">
        📈 Trend Strength
      </h2>

      <div className="text-center">

        <h1 className={`text-5xl font-bold ${color}`}>
          {adx.toFixed(2)}
        </h1>

        <p className={`mt-4 text-xl font-semibold ${color}`}>
          {strength}
        </p>

      </div>

    </div>
  );
}