import { NextRequest, NextResponse } from "next/server";
import { EMA } from "technicalindicators";
import { generateAIAnalysis } from "@/app/services/aiEngine";
import { detectPattern } from "@/app/services/candlestickEngine";
import type { UTCTimestamp } from "lightweight-charts";

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.TWELVEDATA_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "TWELVEDATA_API_KEY is missing" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.twelvedata.com/time_series?symbol=XAU/USD&interval=15min&outputsize=100&apikey=${apiKey}`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    const data = await response.json();

    if (!data.values) {
      return NextResponse.json(
        {
          error: "Unable to fetch candle data",
          details: data,
        },
        { status: 500 }
      );
    }

    const candles = [...data.values].reverse();

    const highs = candles.map((c: any) => Number(c.high));
    const lows = candles.map((c: any) => Number(c.low));
    const closes = candles.map((c: any) => Number(c.close));

    const pattern = detectPattern(
      candles.map((c: any) => ({
        open: Number(c.open),
        high: Number(c.high),
        low: Number(c.low),
        close: Number(c.close),
      }))
    );

    const ai = generateAIAnalysis(
      highs,
      lows,
      closes
    );

    const formattedCandles = candles.map((c: any) => ({
      time: Math.floor(
        new Date(c.datetime).getTime() / 1000
      ) as UTCTimestamp,
      open: Number(c.open),
      high: Number(c.high),
      low: Number(c.low),
      close: Number(c.close),
    }));

    // EMA 20
    const ema20Values = EMA.calculate({
      period: 20,
      values: closes,
    });

    // EMA 50
    const ema50Values = EMA.calculate({
      period: 50,
      values: closes,
    });

    const ema20Chart = formattedCandles
      .slice(19)
      .map((c, i) => ({
        time: c.time,
        value: ema20Values[i],
      }));

    const ema50Chart = formattedCandles
      .slice(49)
      .map((c, i) => ({
        time: c.time,
        value: ema50Values[i],
      }));

    return NextResponse.json({
      currentPrice: closes.at(-1),

      ...ai,

      pattern: pattern.pattern,
      patternBias: pattern.bias,
      patternReliability: pattern.reliability,

      candles: formattedCandles,

      ema20Chart,
      ema50Chart,

      lastUpdated: new Date().toISOString(),
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}