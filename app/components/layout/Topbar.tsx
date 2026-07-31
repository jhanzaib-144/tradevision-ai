"use client";

import {
  Bell,
  Search,
  UserCircle2,
  Wifi,
} from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-20 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8">

      {/* Left */}

      <div>

        <h1 className="text-3xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-gray-400">
          Welcome to TradeVision AI
        </p>

      </div>

      {/* Center */}

      <div className="hidden lg:flex items-center bg-slate-800 rounded-xl px-4 py-3 w-[420px]">

        <Search
          size={18}
          className="text-gray-400"
        />

        <input
          placeholder="Search..."
          className="bg-transparent ml-3 outline-none text-white w-full"
        />

      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        <div className="flex items-center gap-2 text-green-400">

          <Wifi size={18} />

          <span className="text-sm">
            Live
          </span>

        </div>

        <Bell
          className="text-white"
          size={22}
        />

        <UserCircle2
          className="text-white"
          size={34}
        />

      </div>

    </header>
  );
}