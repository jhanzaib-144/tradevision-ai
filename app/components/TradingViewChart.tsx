"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    TradingView: any;
  }
}

export default function TradingViewChart() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const existingScript = document.getElementById("tradingview-widget");

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "tradingview-widget";
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;

      script.onload = () => {
        if (window.TradingView && container.current) {
          new window.TradingView.widget({
            autosize: true,
            symbol: "OANDA:XAUUSD",
            interval: "15",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "1",
            locale: "en",
            toolbar_bg: "#0f172a",
            enable_publishing: false,
            hide_top_toolbar: false,
            allow_symbol_change: true,
            container_id: "tv_chart_container",
          });
        }
      };

      document.body.appendChild(script);
    } else if (window.TradingView && container.current) {
      new window.TradingView.widget({
        autosize: true,
        symbol: "OANDA:XAUUSD",
        interval: "15",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        toolbar_bg: "#0f172a",
        enable_publishing: false,
        hide_top_toolbar: false,
        allow_symbol_change: true,
        container_id: "tv_chart_container",
      });
    }
  }, []);

  return (
    <div
      id="tv_chart_container"
      ref={container}
      className="w-full h-[600px] rounded-xl overflow-hidden"
    />
  );
}