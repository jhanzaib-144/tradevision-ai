import { prisma } from "@/app/lib/prisma";

export async function getDashboard() {
  const trades: any[] = await prisma.trade.findMany();

  const signals = await prisma.signal.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 1,
  });

  const totalTrades = trades.length;

  const openTrades = trades.filter(
    (t: any) => t.status === "OPEN"
  ).length;

  const closedTrades = trades.filter(
    (t: any) => t.status === "CLOSED"
  ).length;

  const winningTrades = trades.filter(
    (t: any) => (t.profit ?? 0) > 0
  ).length;

  const losingTrades = trades.filter(
    (t: any) => (t.profit ?? 0) < 0
  ).length;

  const totalProfit = trades.reduce(
    (sum: number, trade: any) => sum + (trade.profit ?? 0),
    0
  );

  const winRate =
    closedTrades === 0
      ? 0
      : Number(((winningTrades / closedTrades) * 100).toFixed(2));

  return {
    totalTrades,
    openTrades,
    closedTrades,
    winningTrades,
    losingTrades,
    totalProfit,
    winRate,
    latestSignal: signals[0] ?? null,
  };
}