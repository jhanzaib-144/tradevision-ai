"use client";

import { useEffect, useState } from "react";

import AppLayout from "@/app/components/layout/AppLayout";
import MarketStatusBar from "@/app/components/dashboard/MarketStatusBar";
import GoldPriceCard from "@/app/components/dashboard/GoldPriceCard";
import SignalCard from "@/app/components/dashboard/SignalCard";
import TradingChart from "@/app/components/dashboard/TradingChart";
import TechnicalPanel from "@/app/components/dashboard/TechnicalPanel";
import SupportResistance from "@/app/components/dashboard/SupportResistance";
import RecentTrades from "@/app/components/dashboard/RecentTrades";
import MarketSummary from "@/app/components/dashboard/MarketSummary";
import Watchlist from "@/app/components/dashboard/Watchlist";

export default function DashboardPage() {
  const [analysis, setAnalysis] = useState<any>(null);
  const [market, setMarket] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();

    const interval = setInterval(loadDashboard, 60000);

    return () => clearInterval(interval);
  }, []);

  async function loadDashboard() {
    try {
      const analysisRes = await fetch("/api/analysis");

      if (!analysisRes.ok) {
        throw new Error("Failed to load analysis");
      }

      const analysisData = await analysisRes.json();

      setAnalysis(analysisData);

      const marketRes = await fetch("/api/market");

      if (marketRes.ok) {
        const marketData = await marketRes.json();
        setMarket(marketData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading || !analysis || !market) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-green-500 mx-auto"></div>

            <p className="text-white text-2xl mt-6">
              Loading TradeVision AI...
            </p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>

      <MarketStatusBar
        price={analysis.currentPrice}
        signal={analysis.signal}
        confidence={analysis.confidence}
        trend={analysis.trend}
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

        <GoldPriceCard
          price={analysis.currentPrice}
          signal={analysis.signal}
          trend={analysis.trend}
          lastUpdated={analysis.lastUpdated}
        />

        <SignalCard
          signal={analysis.signal}
          confidence={analysis.confidence}
          entry={analysis.entry}
          stopLoss={analysis.stopLoss}
          takeProfit1={analysis.takeProfit1}
          takeProfit2={analysis.takeProfit2}
          trend={analysis.trend}
          risk={analysis.riskLevel}
        />

      </div>

      <div className="mb-8">

        <TradingChart
          candles={analysis.candles}
          ema20={analysis.ema20Chart}
          ema50={analysis.ema50Chart}
          entry={analysis.entry}
          stopLoss={analysis.stopLoss}
          takeProfit1={analysis.takeProfit1}
          takeProfit2={analysis.takeProfit2}
          takeProfit3={analysis.takeProfit3}
        />

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

        <TechnicalPanel analysis={analysis} />

        <SupportResistance analysis={analysis} />

        <MarketSummary
          signal={analysis.signal}
          trend={analysis.trend}
          confidence={analysis.confidence}
          rsi={analysis.rsi}
          adx={analysis.adx}
          pattern={analysis.pattern}
          reason={analysis.reason}
        />

        <RecentTrades />

        <Watchlist
          assets={[
            market.gold,
            market.silver,
            market.bitcoin,
            market.ethereum,
            market.oil,
            market.dxy,
            market.eurusd,
            market.gbpusd,
          ]}
        />

      </div>

    </AppLayout>
  );
}