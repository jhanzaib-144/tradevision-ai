"use client";

import { Activity, Bell, TrendingUp } from "lucide-react";

export default function Header() {
  return (
    <div className="mb-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-5xl font-extrabold text-white">
            TradeVision AI
          </h1>

          <p className="text-gray-400 mt-2">
            AI Powered Gold Trading Platform
          </p>

        </div>

        <div className="flex gap-4">

          <div className="bg-gray-900 rounded-xl p-3 border border-gray-800">
            <Bell className="text-yellow-400" />
          </div>

          <div className="bg-gray-900 rounded-xl p-3 border border-gray-800">
            <Activity className="text-green-500" />
          </div>

          <div className="bg-gray-900 rounded-xl p-3 border border-gray-800">
            <TrendingUp className="text-blue-500" />
          </div>

        </div>

      </div>

      <div className="mt-6 h-[1px] bg-gray-800" />

    </div>
  );
}