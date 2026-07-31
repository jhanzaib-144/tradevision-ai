import { prisma } from "@/app/lib/prisma";

interface SaveSignalParams {
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
}

export async function saveSignal(data: SaveSignalParams) {
  return prisma.signal.create({
    data,
  });
}