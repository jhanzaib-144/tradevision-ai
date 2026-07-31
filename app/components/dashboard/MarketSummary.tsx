"use client";

interface Props {
  signal: string;
  trend: string;
  confidence: number;
  rsi: number;
  adx: number;
  pattern: string;
  reason: string;
}

function InfoRow({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 py-3">

      <span className="text-slate-400">
        {title}
      </span>

      <span className="font-bold text-white">
        {value}
      </span>

    </div>
  );
}

export default function MarketSummary({
  signal,
  trend,
  confidence,
  rsi,
  adx,
  pattern,
  reason,
}: Props) {

  const signalColor =
    signal === "BUY"
      ? "bg-green-500"
      : signal === "SELL"
      ? "bg-red-500"
      : "bg-yellow-500";

  const trendColor =
    trend === "Bullish"
      ? "text-green-400"
      : trend === "Bearish"
      ? "text-red-400"
      : "text-yellow-400";

  return (

    <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-black border border-slate-700 shadow-2xl overflow-hidden">

      <div className="p-6">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-xs uppercase tracking-widest text-cyan-400">
              Artificial Intelligence
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white">
              Market Summary
            </h2>

          </div>

          <div
            className={`px-5 py-2 rounded-xl text-white font-bold ${signalColor}`}
          >
            {signal}
          </div>

        </div>

        {/* Confidence */}

        <div className="mt-8">

          <div className="flex justify-between mb-2">

            <span className="text-slate-400">

              AI Confidence

            </span>

            <span className="text-white font-bold">

              {confidence}%

            </span>

          </div>

          <div className="h-3 rounded-full bg-slate-700 overflow-hidden">

            <div
              className="h-full rounded-full bg-cyan-500 transition-all duration-700"
              style={{
                width: `${confidence}%`,
              }}
            />

          </div>

        </div>

        {/* Summary */}

        <div className="mt-8 rounded-2xl bg-slate-800/40 border border-slate-700 p-5 space-y-2">

          <InfoRow
            title="Trend"
            value={trend}
          />

          <InfoRow
            title="RSI"
            value={rsi.toFixed(2)}
          />

          <InfoRow
            title="ADX"
            value={adx.toFixed(2)}
          />

          <InfoRow
            title="Pattern"
            value={pattern}
          />

        </div>

        {/* AI Opinion */}

        <div className="mt-8 rounded-2xl bg-slate-900 border border-cyan-600 p-5">

          <h3 className="text-xl font-bold text-cyan-400">
            AI Decision
          </h3>

          <p className={`mt-3 text-lg font-bold ${trendColor}`}>
            {trend}
          </p>

          <p className="mt-4 text-slate-300 leading-8">

            {reason}

          </p>

        </div>

        {/* Recommendation */}

        <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-800/40 p-5">

          <h3 className="text-lg font-bold text-white mb-3">

            Recommendation

          </h3>

          <p className="text-slate-300 leading-7">

            {signal === "BUY"
              ? "The AI detects bullish momentum supported by multiple technical indicators. Buying opportunities are currently favored while maintaining proper risk management."
              : signal === "SELL"
              ? "The AI detects bearish momentum with increased selling pressure. Short opportunities are preferred until market structure changes."
              : "The market is currently indecisive. Wait for confirmation before opening any new positions."}

          </p>

        </div>

      </div>

    </div>

  );

}