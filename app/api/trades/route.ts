import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/app/lib/jwt";
import {
  createTrade,
  getUserTrades,
} from "@/app/services/tradeService";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);

    const trades = await getUserTrades(payload.userId);

    return NextResponse.json(trades);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);

    const body = await request.json();

    const trade = await createTrade({
      userId: payload.userId,
      symbol: body.symbol,
      entry: body.entry,
    });

    return NextResponse.json(trade);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create trade" },
      { status: 500 }
    );
  }
}