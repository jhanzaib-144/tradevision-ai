export default function Header() {
  return (
    <header className="bg-slate-900 border-b border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-yellow-400">
            Trade Vision AI Pro
          </h1>
          <p className="text-slate-400 text-sm">
            Gold (XAU/USD) • 15 Minute AI Trading Dashboard
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-green-400 font-semibold">
            LIVE
          </span>
        </div>
      </div>
    </header>
  );
}