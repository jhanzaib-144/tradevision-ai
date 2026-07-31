"use client";

import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface Props {
  children: ReactNode;
}

export default function AppLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen bg-slate-950">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top Navigation */}
        <Topbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>

      </div>

    </div>
  );
}