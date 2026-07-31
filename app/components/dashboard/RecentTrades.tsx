type RecentTrade = {
  symbol: string;
  side: "BUY" | "SELL";
  entry: number;
  exit: number;
  profit: number;
  status: "OPEN" | "CLOSED";
};

const sampleTrades: RecentTrade[] = [
  {
    symbol: "XAU/USD",
    side: "BUY",
    entry: 4112.2,
    exit: 4128.8,
    profit: 16.6,
    status: "CLOSED",
  },
  {
    symbol: "XAU/USD",
    side: "SELL",
    entry: 4130.4,
    exit: 4119.9,
    profit: 10.5,
    status: "CLOSED",
  },
  {
    symbol: "XAU/USD",
    side: "BUY",
    entry: 4105.7,
    exit: 0,
    profit: 0,
    status: "OPEN",
  },
];

function TradeRow({ trade }: { trade: RecentTrade }) {
  const profitColor =
    trade.profit > 0
      ? "text-emerald-400"
      : trade.profit < 0
      ? "text-rose-400"
      : "text-slate-400";

  return (
    <tr className="border-t border-slate-800">
      <td className="py-3 pr-3 text-white font-medium">{trade.symbol}</td>
      <td className={`py-3 pr-3 font-semibold ${trade.side === "BUY" ? "text-emerald-400" : "text-rose-400"}`}>
        {trade.side}
      </td>
      <td className="py-3 pr-3 text-slate-300">{trade.entry.toFixed(2)}</td>
      <td className="py-3 pr-3 text-slate-300">
        {trade.status === "OPEN" ? "-" : trade.exit.toFixed(2)}
      </td>
      <td className={`py-3 pr-3 font-semibold ${profitColor}`}>
        {trade.status === "OPEN" ? "OPEN" : trade.profit.toFixed(2)}
      </td>
    </tr>
  );
}

export default function RecentTrades() {
  return (
    <div className="xl:col-span-1 rounded-2xl bg-[#0B1220] border border-slate-800 p-6 shadow-xl">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold text-white">Recent Trades</h2>
        <span className="text-sm text-slate-400">Live preview</span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900">
            <tr className="text-slate-400">
              <th className="px-4 py-3 font-medium">Symbol</th>
              <th className="px-4 py-3 font-medium">Side</th>
              <th className="px-4 py-3 font-medium">Entry</th>
              <th className="px-4 py-3 font-medium">Exit</th>
              <th className="px-4 py-3 font-medium">P/L</th>
            </tr>
          </thead>

          <tbody>
            {sampleTrades.map((trade, index) => (
              <TradeRow key={`${trade.symbol}-${index}`} trade={trade} />
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-slate-400">
        This panel is ready for live trade history integration later.
      </p>
    </div>
  );
}