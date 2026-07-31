"use client";

interface Asset {
  symbol: string;
  price: number;
  change: number;
}

interface WatchlistProps {
  assets: Asset[];
}

export default function Watchlist({ assets }: WatchlistProps) {
  return (
    <div className="rounded-xl bg-gray-900 border border-gray-800 p-5">
      <h2 className="text-xl font-bold text-white mb-4">
        Watchlist
      </h2>

      <div className="space-y-3">
        {assets.map((asset) => (
          <div
            key={asset.symbol}
            className="flex justify-between items-center border-b border-gray-800 pb-2"
          >
            <div>
              <p className="text-white font-semibold">
                {asset.symbol}
              </p>
            </div>

            <div className="text-right">
              <p className="text-white">
                {asset.price.toFixed(2)}
              </p>

              <p
                className={`text-sm ${
                  asset.change >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {asset.change >= 0 ? "+" : ""}
                {asset.change}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}