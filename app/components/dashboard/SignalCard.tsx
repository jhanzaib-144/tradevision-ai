"use client";

interface SignalCardProps {
  signal: string;
  confidence: number;
  entry: number;
  stopLoss: number;
  takeProfit1: number;
  takeProfit2: number;
  trend: string;
  risk: string;
}

export default function SignalCard({
  signal,
  confidence,
  entry,
  stopLoss,
  takeProfit1,
  takeProfit2,
  trend,
  risk,
}: SignalCardProps) {

  const badgeColor =
    signal === "BUY"
      ? "bg-green-500"
      : signal === "SELL"
      ? "bg-red-500"
      : "bg-yellow-500";

  const progressColor =
    confidence >= 80
      ? "bg-green-500"
      : confidence >= 60
      ? "bg-yellow-500"
      : "bg-red-500";

  const trendColor =
    trend === "Bullish"
      ? "text-green-400"
      : trend === "Bearish"
      ? "text-red-400"
      : "text-yellow-400";

  const riskColor =
    risk === "LOW"
      ? "text-green-400"
      : risk === "MEDIUM"
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-900 via-slate-950 to-black shadow-2xl">

      <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"></div>

      <div className="relative p-8">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs uppercase tracking-widest text-blue-400">
              TradeVision AI
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white">
              AI Trading Signal
            </h2>

          </div>

          <div
            className={`rounded-full px-6 py-3 text-lg font-bold text-white ${badgeColor}`}
          >
            {signal}
          </div>

        </div>

        {/* Confidence */}

        <div className="mt-8">

          <div className="mb-3 flex justify-between">

            <span className="text-slate-400">
              Confidence
            </span>

            <span className="font-bold text-white">
              {confidence}%
            </span>

          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-700">

            <div
              className={`h-full rounded-full transition-all duration-700 ${progressColor}`}
              style={{
                width: `${confidence}%`,
              }}
            />

          </div>

        </div>

        {/* Trend + Risk */}

        <div className="mt-8 grid grid-cols-2 gap-5">

          <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-5">

            <p className="text-xs uppercase text-slate-400">
              Trend
            </p>

            <p className={`mt-2 text-2xl font-bold ${trendColor}`}>
              {trend}
            </p>

          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-5">

            <p className="text-xs uppercase text-slate-400">
              Risk
            </p>

            <p className={`mt-2 text-2xl font-bold ${riskColor}`}>
              {risk}
            </p>

          </div>

        </div>

        {/* Price Levels */}

        <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">

          <PriceCard
            title="ENTRY"
            value={entry}
            color="text-cyan-400"
          />

          <PriceCard
            title="STOP LOSS"
            value={stopLoss}
            color="text-red-400"
          />

          <PriceCard
            title="TAKE PROFIT 1"
            value={takeProfit1}
            color="text-green-400"
          />

          <PriceCard
            title="TAKE PROFIT 2"
            value={takeProfit2}
            color="text-emerald-400"
          />

        </div>

        {/* Recommendation */}

        <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-800/40 p-5">

          <h3 className="text-lg font-semibold text-white">
            AI Recommendation
          </h3>

          <p className="mt-3 leading-7 text-slate-300">

            {signal === "BUY" &&
              "Trend remains bullish. Wait for a confirmation candle before entering the trade. Protect your position with the suggested Stop Loss."}

            {signal === "SELL" &&
              "Bearish pressure is increasing. Consider short positions only after confirmation from the next candle."}

            {signal === "WAIT" &&
              "Current market conditions are not ideal. Stay patient until TradeVision AI detects a higher probability setup."}

          </p>

        </div>

      </div>

    </div>
  );
}

function PriceCard({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-5">

      <p className="text-xs uppercase tracking-wide text-slate-400">
        {title}
      </p>

      <h3 className={`mt-3 text-2xl font-bold ${color}`}>
        {value.toFixed(2)}
      </h3>

    </div>
  );
}