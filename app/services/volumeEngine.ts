export interface VolumeResult {

  averageVolume: number;

  currentVolume: number;

  strength: "LOW" | "NORMAL" | "HIGH";

  breakoutConfirmed: boolean;

  buyingPressure: boolean;

  sellingPressure: boolean;

}

export function analyzeVolume(

  volumes: number[],

  closes: number[]

): VolumeResult {

  if (volumes.length === 0) {

    return {

      averageVolume: 0,

      currentVolume: 0,

      strength: "NORMAL",

      breakoutConfirmed: false,

      buyingPressure: false,

      sellingPressure: false,

    };

  }

  const averageVolume =
    volumes.reduce((a, b) => a + b, 0) /
    volumes.length;

  const currentVolume =
    volumes.at(-1)!;

  const previousClose =
    closes.at(-2)!;

  const currentClose =
    closes.at(-1)!;

  let strength: "LOW" | "NORMAL" | "HIGH";

  if (currentVolume > averageVolume * 1.5)
    strength = "HIGH";

  else if (currentVolume < averageVolume * 0.7)
    strength = "LOW";

  else
    strength = "NORMAL";

  const breakoutConfirmed =
    strength === "HIGH";

  const buyingPressure =
    currentClose > previousClose &&
    strength === "HIGH";

  const sellingPressure =
    currentClose < previousClose &&
    strength === "HIGH";

  return {

    averageVolume: Number(
      averageVolume.toFixed(2)
    ),

    currentVolume,

    strength,

    breakoutConfirmed,

    buyingPressure,

    sellingPressure,

  };

}