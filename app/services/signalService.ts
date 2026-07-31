import { prisma } from "@/app/lib/prisma";

export async function createSignal(data: {
  userId: string;
  symbol: string;
  signal: "BUY" | "SELL" | "WAIT";
  confidence: number;
  entry: number;
  stopLoss: number;
  takeProfit1: number;
  takeProfit2: number;
  decision: string;
  reason: string;
  risk: string;
}) {
  return prisma.signal.create({
    data,
  });
}

export async function getUserSignals(userId: string) {
  return prisma.signal.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}