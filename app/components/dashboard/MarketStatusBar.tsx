"use client";

interface Props {
  price: number;
  signal: string;
  confidence: number;
  trend: string;
}

export default function MarketStatusBar({
  price,
  signal,
  confidence,
  trend,
}: Props) {
  return (
    <div className="mb-6 rounded-xl bg-gray-900 border border-gray-800 p-4 flex flex-wrap items-center justify-between gap-4">

      <div>
        <p className="text-gray-400 text-sm">
          XAU/USD
        </p>

        <h2 className="text-3xl font-bold text-white">
          ${price.toFixed(2)}
        </h2>
      </div>

      <div>
        <p className="text-gray-400 text-sm">
          Trend
        </p>

        <p
          className={`font-bold ${
            trend === "Bullish"
              ? "text-green-400"
              : trend === "Bearish"
              ? "text-red-400"
              : "text-yellow-400"
          }`}
        >
          {trend}
        </p>
      </div>

      <div>
        <p className="text-gray-400 text-sm">
          Signal
        </p>

        <p
          className={`font-bold ${
            signal === "BUY"
              ? "text-green-400"
              : signal === "SELL"
              ? "text-red-400"
              : "text-yellow-400"
          }`}
        >
          {signal}
        </p>
      </div>

      <div>
        <p className="text-gray-400 text-sm">
          Confidence
        </p>

        <p className="text-blue-400 font-bold">
          {confidence}%
        </p>
      </div>

      <div>
        <p className="text-gray-400 text-sm">
          Market
        </p>

        <span className="inline-flex items-center gap-2 text-green-400 font-semibold">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          LIVE
        </span>
      </div>
    </div>
  );
}