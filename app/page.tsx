import TrendStrengthCard from "./components/TrendStrengthCard";
import CandlestickPatternCard from "./components/CandlestickPatternCard";
import SignalStrengthCard from "./components/SignalStrengthCard";
import AIDecisionCard from "./components/AIDecisionCard";
import { AnalysisProvider } from "./context/AnalysisContext";
import SupportResistanceCard from "./components/SupportResistanceCard";
import TradeSetupCard from "./components/TradeSetupCard";
import IndicatorGrid from "./components/IndicatorGrid";
import SignalCard from "./components/SignalCard";
import PriceCard from "./components/PriceCard";
import TradingViewChart from "./components/TradingViewChart";
import Header from "./components/Header";

export default function Home() {
  return (
    <AnalysisProvider>
  <main className="min-h-screen bg-slate-950 text-white">
      <Header />

      <div className="w-full px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <PriceCard />

          <SignalCard />

          <IndicatorGrid />

          <div className="bg-slate-900 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-blue-400">
              Market Session
            </h2>

            <h1 className="text-3xl mt-5 font-bold">
              London
            </h1>

            <p className="text-green-400 mt-2">
              Active
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

  {/* Trading Chart */}
  <div className="xl:col-span-2 bg-slate-900 rounded-2xl p-4">
    <TradingViewChart />
  </div>

  {/* Right Sidebar */}
  <div className="space-y-6">
  <SignalStrengthCard />
  <TrendStrengthCard />
  <CandlestickPatternCard />
  <TradeSetupCard />
  <SupportResistanceCard />
</div>

</div>
<AIDecisionCard />
      </div>
      </main>
</AnalysisProvider>
  );
}