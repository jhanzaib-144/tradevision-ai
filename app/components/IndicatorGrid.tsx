"use client";

import { useAnalysisContext } from "../context/AnalysisContext";

export default function IndicatorGrid() {
  const { data, loading } = useAnalysisContext();

  if (loading || !data) {
    return (
      <div className="bg-slate-900 rounded-xl p-6 mt-8">
        Loading Indicators...
      </div>
    );
  }

  const cards = [
    {
      title: "EMA20",
      value: data.ema20.toFixed(2),
      color: "text-cyan-400",
    },
    {
      title: "EMA50",
      value: data.ema50.toFixed(2),
      color: "text-blue-400",
    },
    {
      title: "RSI",
      value: data.rsi.toFixed(2),
      color: "text-yellow-400",
    },
    {
      title: "ATR",
      value: data.atr.toFixed(2),
      color: "text-orange-400",
    },
    {
      title: "Confidence",
      value: `${data.confidence}%`,
      color: "text-green-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-slate-900 rounded-xl p-5 border border-slate-700 hover:border-yellow-500 transition-all"
        >
          <p className="text-slate-400 text-sm">{card.title}</p>

          <h2 className={`text-3xl mt-3 font-bold ${card.color}`}>
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}