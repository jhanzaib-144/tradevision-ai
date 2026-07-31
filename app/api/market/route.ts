import { NextResponse } from "next/server";
import { getMarketData } from "@/app/services/marketService";

export async function GET() {
  try {
    const market = await getMarketData();

    return NextResponse.json(market);
  } catch (error) {
    console.error("Market API Error:", error);

    return NextResponse.json(
      {
        error: "Unable to load market data",
      },
      {
        status: 500,
      }
    );
  }
}