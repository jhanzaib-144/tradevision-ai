"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  LineChart,
  Brain,
  Newspaper,
  Settings,
  BarChart3,
} from "lucide-react";

const menu = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Live Chart",
    href: "/dashboard",
    icon: LineChart,
  },
  {
    name: "AI Analysis",
    href: "/dashboard",
    icon: Brain,
  },
  {
    name: "Analytics",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    name: "News",
    href: "/dashboard",
    icon: Newspaper,
  },
  {
    name: "Settings",
    href: "/dashboard",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 min-h-screen">

      <div className="p-8 border-b border-slate-800">

        <h1 className="text-3xl font-bold text-white">
          TradeVision
        </h1>

        <p className="text-green-400 text-sm">
          AI Trading Platform
        </p>

      </div>

      <nav className="p-4 space-y-2">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-4 rounded-xl p-4 text-gray-300 hover:bg-slate-800 hover:text-white transition"
            >
              <Icon size={22} />

              <span>{item.name}</span>
            </Link>
          );
        })}

      </nav>

    </aside>
  );
}