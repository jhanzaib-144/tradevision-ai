export interface FibonacciResult {
  high: number;
  low: number;

  level236: number;
  level382: number;
  level500: number;
  level618: number;
  level786: number;
}

export function calculateFibonacci(
  highs: number[],
  lows: number[]
): FibonacciResult {

  const high = Math.max(...highs);

  const low = Math.min(...lows);

  const diff = high - low;

  return {

    high: Number(high.toFixed(2)),

    low: Number(low.toFixed(2)),

    level236: Number((high - diff * 0.236).toFixed(2)),

    level382: Number((high - diff * 0.382).toFixed(2)),

    level500: Number((high - diff * 0.5).toFixed(2)),

    level618: Number((high - diff * 0.618).toFixed(2)),

    level786: Number((high - diff * 0.786).toFixed(2)),
  };
}