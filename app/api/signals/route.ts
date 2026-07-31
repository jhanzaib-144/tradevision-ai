import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { verifyToken } from "@/app/lib/jwt";

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

    const signals = await prisma.signal.findMany({
      where: {
        userId: payload.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(signals);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}