"use client";

import { useEffect, useState } from "react";

export interface AnalysisData {
  currentPrice: number;
  signal: "BUY" | "SELL" | "WAIT";
  confidence: number;
  pattern: string;
patternBias: "BUY" | "SELL" | "WAIT";
patternReliability: number;
  trend: string;
  entry: number;
  stopLoss: number;
  takeProfit1: number;
  takeProfit2: number;
  ema20: number;
  ema50: number;
  adx: number;
  
  atr: number;
  support1: number;
support2: number;

resistance1: number;
resistance2: number;
  rsi: number;
  lastUpdated: string;
}

export function useAnalysis() {
  const [data, setData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const res = await fetch("/api/analysis", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch analysis");
      }

      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Analysis Error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();

    const interval = setInterval(load, 60000);

    return () => clearInterval(interval);
  }, []);

  return {
    data,
    loading,
  };
}