import { prisma } from "@/app/lib/prisma";

export async function createTrade(data: {
  userId: string;
  symbol: string;
  entry: number;
}) {
  return prisma.trade.create({
    data,
  });
}

export async function getUserTrades(userId: string) {
  return prisma.trade.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function closeTrade(
  id: string,
  exit: number,
  profit: number
) {
  return prisma.trade.update({
    where: {
      id,
    },
    data: {
      exit,
      profit,
      status: "CLOSED",
    },
  });
}