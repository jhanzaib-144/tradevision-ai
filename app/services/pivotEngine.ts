export interface PivotResult {
  pivot: number;

  resistance1: number;
  resistance2: number;
  resistance3: number;

  support1: number;
  support2: number;
  support3: number;
}

export function calculatePivotPoints(
  high: number,
  low: number,
  close: number
): PivotResult {

  const pivot = (high + low + close) / 3;

  const resistance1 = (2 * pivot) - low;
  const support1 = (2 * pivot) - high;

  const resistance2 = pivot + (high - low);
  const support2 = pivot - (high - low);

  const resistance3 =
    high + 2 * (pivot - low);

  const support3 =
    low - 2 * (high - pivot);

  return {

    pivot: Number(pivot.toFixed(2)),

    resistance1: Number(resistance1.toFixed(2)),
    resistance2: Number(resistance2.toFixed(2)),
    resistance3: Number(resistance3.toFixed(2)),

    support1: Number(support1.toFixed(2)),
    support2: Number(support2.toFixed(2)),
    support3: Number(support3.toFixed(2)),
  };

}