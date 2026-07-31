import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/app/lib/jwt";
import { closeTrade } from "@/app/services/tradeService";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check login
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    verifyToken(token);

    const { id } = await params;

    const body = await request.json();

    const trade = await closeTrade(
      id,
      body.exit,
      body.profit
    );

    return NextResponse.json(trade);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to close trade" },
      { status: 500 }
    );
  }
}