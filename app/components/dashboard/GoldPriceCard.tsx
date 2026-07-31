"use client";

interface GoldPriceCardProps {
  price: number;
  signal: string;
  trend: string;
  lastUpdated: string;
}

export default function GoldPriceCard({
  price,
  signal,
  trend,
  lastUpdated,
}: GoldPriceCardProps) {
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

  const now = new Date(lastUpdated);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-slate-900 via-slate-950 to-black shadow-2xl">

      {/* Background Glow */}

      <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-yellow-500/10 blur-3xl"></div>

      <div className="relative p-8">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs uppercase tracking-widest text-yellow-400">
              Gold Spot
            </p>

            <h2 className="mt-1 text-3xl font-bold text-white">
              XAU / USD
            </h2>

          </div>

          <div
            className={`rounded-full px-5 py-2 text-sm font-bold text-white ${signalColor}`}
          >
            {signal}
          </div>

        </div>

        {/* Price */}

        <div className="mt-10">

          <p className="text-sm text-slate-400">
            Current Price
          </p>

          <h1 className="mt-2 text-6xl font-extrabold tracking-tight text-white">
            ${price.toFixed(2)}
          </h1>

        </div>

        {/* Trend */}

        <div className="mt-4 flex items-center gap-3">

          <span className="h-3 w-3 animate-pulse rounded-full bg-green-500"></span>

          <span className={`text-lg font-semibold ${trendColor}`}>
            {trend}
          </span>

        </div>

        {/* Statistics */}

        <div className="mt-10 grid grid-cols-2 gap-5">

          <div className="rounded-2xl bg-slate-800/60 p-4 border border-slate-700">

            <p className="text-xs uppercase tracking-wide text-slate-400">
              Daily High
            </p>

            <p className="mt-2 text-2xl font-bold text-green-400">
              ${(price + 8).toFixed(2)}
            </p>

          </div>

          <div className="rounded-2xl bg-slate-800/60 p-4 border border-slate-700">

            <p className="text-xs uppercase tracking-wide text-slate-400">
              Daily Low
            </p>

            <p className="mt-2 text-2xl font-bold text-red-400">
              ${(price - 8).toFixed(2)}
            </p>

          </div>

        </div>

        {/* Footer */}

        <div className="mt-8 flex items-center justify-between border-t border-slate-800 pt-5">

          <div>

            <p className="text-xs text-slate-500">
              Last Updated
            </p>

            <p className="font-medium text-white">
              {now.toLocaleTimeString()}
            </p>

          </div>

          <div className="flex items-center gap-2">

            <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>

            <span className="text-green-400 font-semibold">
              LIVE
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}