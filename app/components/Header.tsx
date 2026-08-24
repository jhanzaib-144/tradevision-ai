import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-slate-900 border-b border-slate-700 px-4 py-4 sm:px-6">
      <div className="flex items-center justify-between gap-4">

        {/* Logo + Branding */}
        <div className="flex items-center gap-4">

          <Image
            src="/logo.png"
            alt="Rayyan's Algo - TradeVision AI"
            width={70}
            height={70}
            className="h-14 w-14 sm:h-16 sm:w-16 object-contain"
            priority
          />

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-yellow-400">
              TradeVision AI
            </h1>

            <p className="text-xs sm:text-sm font-semibold tracking-wider text-yellow-500">
              RAYYAN&apos;S ALGO
            </p>

            <p className="hidden sm:block text-slate-400 text-sm mt-1">
              Gold (XAU/USD) • 15 Minute AI Trading Dashboard
            </p>

            <p className="sm:hidden text-slate-400 text-xs mt-1">
              XAU/USD • AI Trading Dashboard
            </p>
          </div>

        </div>

        {/* Live Status */}
        <div className="flex items-center gap-2 shrink-0">

          <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />

          <span className="text-green-400 font-semibold text-sm sm:text-base">
            LIVE
          </span>

        </div>

      </div>
    </header>
  );
}