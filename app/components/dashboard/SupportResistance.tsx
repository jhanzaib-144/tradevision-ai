"use client";

interface SupportResistanceProps {
  analysis: {
    support1?: number;
    support2?: number;
    resistance1?: number;
    resistance2?: number;

    entry?: number;
    stopLoss?: number;

    takeProfit1?: number;
    takeProfit2?: number;
    takeProfit3?: number;

    signal?: string;
    confidence?: number;
  };
}

function PriceBox({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div className="rounded-xl bg-slate-800/40 border border-slate-700 p-4">

      <p className="text-xs uppercase tracking-wide text-slate-400">
        {title}
      </p>

      <h3 className={`mt-2 text-2xl font-bold ${color}`}>
        {value.toFixed(2)}
      </h3>

    </div>
  );
}

export default function SupportResistance({
  analysis,
}: SupportResistanceProps) {

  const signalColor =
    analysis.signal === "BUY"
      ? "text-green-400"
      : analysis.signal === "SELL"
      ? "text-red-400"
      : "text-yellow-400";

  return (

    <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-black border border-slate-700 shadow-2xl overflow-hidden">

      <div className="p-6">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-xs uppercase tracking-widest text-cyan-400">
              Price Levels
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white">
              Support & Resistance
            </h2>

          </div>

          <div className={`text-xl font-bold ${signalColor}`}>
            {analysis.signal}
          </div>

        </div>

        {/* Support */}

        <div className="mt-8">

          <h3 className="text-green-400 font-bold mb-4">
            SUPPORT ZONES
          </h3>

          <div className="grid grid-cols-2 gap-4">

            <PriceBox
              title="Support 1"
              value={analysis.support1 ?? 0}
              color="text-green-400"
            />

            <PriceBox
              title="Support 2"
              value={analysis.support2 ?? 0}
              color="text-green-300"
            />

          </div>

        </div>

        {/* Resistance */}

        <div className="mt-8">

          <h3 className="text-red-400 font-bold mb-4">
            RESISTANCE ZONES
          </h3>

          <div className="grid grid-cols-2 gap-4">

            <PriceBox
              title="Resistance 1"
              value={analysis.resistance1 ?? 0}
              color="text-red-400"
            />

            <PriceBox
              title="Resistance 2"
              value={analysis.resistance2 ?? 0}
              color="text-red-300"
            />

          </div>

        </div>

        {/* Trade Setup */}

        <div className="mt-8 rounded-2xl bg-slate-800/40 border border-slate-700 p-5">

          <h3 className="text-xl font-bold text-white mb-5">
            AI Trade Setup
          </h3>

          <div className="grid grid-cols-2 gap-4">

            <PriceBox
              title="Entry"
              value={analysis.entry ?? 0}
              color="text-cyan-400"
            />

            <PriceBox
              title="Stop Loss"
              value={analysis.stopLoss ?? 0}
              color="text-red-400"
            />

            <PriceBox
              title="Take Profit 1"
              value={analysis.takeProfit1 ?? 0}
              color="text-green-400"
            />

            <PriceBox
              title="Take Profit 2"
              value={analysis.takeProfit2 ?? 0}
              color="text-green-400"
            />

            <PriceBox
              title="Take Profit 3"
              value={analysis.takeProfit3 ?? 0}
              color="text-green-400"
            />

            <div className="rounded-xl bg-slate-900 border border-slate-700 p-4 flex flex-col justify-center">

              <p className="text-xs uppercase tracking-wide text-slate-400">
                Confidence
              </p>

              <h3 className="mt-2 text-3xl font-bold text-cyan-400">
                {analysis.confidence ?? 0}%
              </h3>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}