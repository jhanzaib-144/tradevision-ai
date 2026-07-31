export interface MarketAsset {
  symbol: string;
  price: number;
  change: number;
}

export interface MarketData {
  gold: MarketAsset;
  silver: MarketAsset;
  bitcoin: MarketAsset;
  ethereum: MarketAsset;
  oil: MarketAsset;
  dxy: MarketAsset;
  eurusd: MarketAsset;
  gbpusd: MarketAsset;
}

const API = process.env.TWELVEDATA_API_KEY!;

async function fetchPrice(symbol: string): Promise<MarketAsset> {
  try {
    const res = await fetch(
      `https://api.twelvedata.com/price?symbol=${encodeURIComponent(
        symbol
      )}&apikey=${API}`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    const data = await res.json();

    return {
      symbol,
      price: Number(data.price ?? 0),
      change: 0,
    };
  } catch {
    return {
      symbol,
      price: 0,
      change: 0,
    };
  }
}

export async function getMarketData(): Promise<MarketData> {
  const [
    gold,
    silver,
    bitcoin,
    ethereum,
    oil,
    dxy,
    eurusd,
    gbpusd,
  ] = await Promise.all([
    fetchPrice("XAU/USD"),
    fetchPrice("XAG/USD"),
    fetchPrice("BTC/USD"),
    fetchPrice("ETH/USD"),
    fetchPrice("USOIL"),
    fetchPrice("DXY"),
    fetchPrice("EUR/USD"),
    fetchPrice("GBP/USD"),
  ]);

  return {
    gold,
    silver,
    bitcoin,
    ethereum,
    oil,
    dxy,
    eurusd,
    gbpusd,
  };
}