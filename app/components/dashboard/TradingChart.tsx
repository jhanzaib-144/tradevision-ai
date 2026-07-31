"use client";

import { useEffect, useRef } from "react";
import {
  createChart,
  ColorType,
  CandlestickSeries,
  LineSeries,
  CrosshairMode,
  LineStyle,
  UTCTimestamp,
} from "lightweight-charts";

interface Candle {
  time: UTCTimestamp;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface LinePoint {
  time: UTCTimestamp;
  value: number;
}

interface TradingChartProps {
  candles: Candle[];
  ema20: LinePoint[];
  ema50: LinePoint[];

  entry: number;
  stopLoss: number;
  takeProfit1: number;
  takeProfit2: number;
  takeProfit3: number;
}

export default function TradingChart({
  candles,
  ema20,
  ema50,
  entry,
  stopLoss,
  takeProfit1,
  takeProfit2,
  takeProfit3,
}: TradingChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 650,

      layout: {
        background: {
          type: ColorType.Solid,
          color: "#0f172a",
        },
        textColor: "#d1d5db",
        attributionLogo: false,
      },

      grid: {
        vertLines: {
          color: "#1e293b",
          style: LineStyle.Dotted,
        },
        horzLines: {
          color: "#1e293b",
          style: LineStyle.Dotted,
        },
      },

      crosshair: {
        mode: CrosshairMode.Normal,
      },

      rightPriceScale: {
        borderColor: "#334155",
        autoScale: true,
      },

      timeScale: {
        borderColor: "#334155",
        timeVisible: true,
        secondsVisible: false,
        rightOffset: 15,
        barSpacing: 12,
      },

      localization: {
  priceFormatter: (price: number) => "$" + price.toFixed(2),
},
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#16a34a",
      downColor: "#dc2626",

      borderVisible: false,

      wickUpColor: "#16a34a",
      wickDownColor: "#dc2626",

      priceLineVisible: true,
      lastValueVisible: true,
    });

    const ema20Series = chart.addSeries(LineSeries, {
      color: "#22c55e",
      lineWidth: 2,
      priceLineVisible: false,
    });

    const ema50Series = chart.addSeries(LineSeries, {
      color: "#3b82f6",
      lineWidth: 2,
      priceLineVisible: false,
    });

    candleSeries.setData(candles);
    ema20Series.setData(ema20);
    ema50Series.setData(ema50);

    // ============================
    // Trading Levels
    // ============================

    candleSeries.createPriceLine({
      price: entry,
      color: "#22c55e",
      lineWidth: 2,
      lineStyle: LineStyle.Dashed,
      axisLabelVisible: true,
      title: "ENTRY",
    });

    candleSeries.createPriceLine({
      price: stopLoss,
      color: "#ef4444",
      lineWidth: 2,
      lineStyle: LineStyle.Dashed,
      axisLabelVisible: true,
      title: "STOP",
    });

    candleSeries.createPriceLine({
      price: takeProfit1,
      color: "#3b82f6",
      lineWidth: 2,
      lineStyle: LineStyle.Dashed,
      axisLabelVisible: true,
      title: "TP1",
    });

    candleSeries.createPriceLine({
      price: takeProfit2,
      color: "#8b5cf6",
      lineWidth: 2,
      lineStyle: LineStyle.Dashed,
      axisLabelVisible: true,
      title: "TP2",
    });

    candleSeries.createPriceLine({
      price: takeProfit3,
      color: "#f59e0b",
      lineWidth: 2,
      lineStyle: LineStyle.Dashed,
      axisLabelVisible: true,
      title: "TP3",
    });

    chart.timeScale().fitContent();

    const resize = () => {
      if (!chartContainerRef.current) return;

      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
      });
    };

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      chart.remove();
    };
  }, [
    candles,
    ema20,
    ema50,
    entry,
    stopLoss,
    takeProfit1,
    takeProfit2,
    takeProfit3,
  ]);

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden">

      <div className="flex justify-between items-center px-6 py-4 border-b border-slate-700">

        <div>
          <h2 className="text-2xl font-bold text-white">
            XAU/USD Professional Chart
          </h2>

          <p className="text-slate-400 text-sm">
            15 Minute • EMA20 • EMA50 • AI Levels
          </p>
        </div>

        <div className="flex gap-2">

          <span className="px-3 py-1 rounded-full bg-green-600 text-white text-xs">
            EMA20
          </span>

          <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs">
            EMA50
          </span>

          <span className="px-3 py-1 rounded-full bg-purple-600 text-white text-xs">
            AI
          </span>

        </div>

      </div>

      <div
        ref={chartContainerRef}
        className="w-full"
      />

    </div>
  );
}