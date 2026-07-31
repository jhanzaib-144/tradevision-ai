"use client";

interface TechnicalPanelProps {
  analysis: {
    ema20?: number;
    ema50?: number;
    rsi?: number;
    atr?: number;
    adx?: number;
    upperBand?: number;
    middleBand?: number;
    lowerBand?: number;
    pattern?: string;
    patternReliability?: number;
    riskLevel?: string;
    trend?: string;
    currentPrice?: number;
  };
}

function StatusBadge({
  label,
  color,
}: {
  label: string;
  color: string;
}) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-bold ${color}`}
    >
      {label}
    </span>
  );
}

function IndicatorRow({
  title,
  value,
  status,
  color,
}: {
  title: string;
  value: string;
  status: string;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800/40 px-4 py-3">

      <div>

        <p className="text-xs uppercase tracking-wide text-slate-400">
          {title}
        </p>

        <h3 className="mt-1 text-xl font-bold text-white">
          {value}
        </h3>

      </div>

      <StatusBadge
        label={status}
        color={color}
      />

    </div>
  );
}

export default function TechnicalPanel({
  analysis,
}: TechnicalPanelProps) {

  const emaBullish =
    (analysis.ema20 ?? 0) >
    (analysis.ema50 ?? 0);

  const rsi = analysis.rsi ?? 50;

  const adx = analysis.adx ?? 20;

  const atr = analysis.atr ?? 0;

  const risk = analysis.riskLevel ?? "LOW";

  return (

    <div className="rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-900 via-slate-950 to-black shadow-2xl overflow-hidden">

      <div className="p-6">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs uppercase tracking-widest text-cyan-400">
              Analysis
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white">
              Technical Panel
            </h2>

          </div>

          <StatusBadge
            label={analysis.trend ?? "Unknown"}
            color={
              analysis.trend === "Bullish"
                ? "bg-green-500 text-white"
                : analysis.trend === "Bearish"
                ? "bg-red-500 text-white"
                : "bg-yellow-500 text-black"
            }
          />

        </div>

        <div className="mt-8 space-y-4">

          <IndicatorRow
            title="EMA 20"
            value={(analysis.ema20 ?? 0).toFixed(2)}
            status={emaBullish ? "Bullish" : "Bearish"}
            color={
              emaBullish
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }
          />

          <IndicatorRow
            title="EMA 50"
            value={(analysis.ema50 ?? 0).toFixed(2)}
            status={emaBullish ? "Support" : "Resistance"}
            color="bg-blue-500 text-white"
          />

          <IndicatorRow
            title="RSI"
            value={rsi.toFixed(2)}
            status={
              rsi > 70
                ? "Overbought"
                : rsi < 30
                ? "Oversold"
                : "Healthy"
            }
            color={
              rsi > 70
                ? "bg-red-500 text-white"
                : rsi < 30
                ? "bg-green-500 text-white"
                : "bg-yellow-500 text-black"
            }
          />

          <IndicatorRow
            title="ADX"
            value={adx.toFixed(2)}
            status={
              adx >= 25
                ? "Strong Trend"
                : "Weak Trend"
            }
            color={
              adx >= 25
                ? "bg-green-500 text-white"
                : "bg-slate-600 text-white"
            }
          />

          <IndicatorRow
            title="ATR"
            value={atr.toFixed(2)}
            status={
              atr > 10
                ? "High Volatility"
                : atr > 5
                ? "Medium"
                : "Low"
            }
            color="bg-purple-500 text-white"
          />

          <IndicatorRow
            title="Risk"
            value={risk}
            status={risk}
            color={
              risk === "LOW"
                ? "bg-green-500 text-white"
                : risk === "MEDIUM"
                ? "bg-yellow-500 text-black"
                : "bg-red-500 text-white"
            }
          />

        </div>

        {/* Bollinger */}

        <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-800/40 p-5">

          <h3 className="text-xl font-bold text-white">
            Bollinger Bands
          </h3>

          <div className="mt-5 grid grid-cols-3 gap-4">

            <Band
              title="Upper"
              value={analysis.upperBand ?? 0}
              color="text-green-400"
            />

            <Band
              title="Middle"
              value={analysis.middleBand ?? 0}
              color="text-blue-400"
            />

            <Band
              title="Lower"
              value={analysis.lowerBand ?? 0}
              color="text-red-400"
            />

          </div>

        </div>

        {/* Pattern */}

        <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-800/40 p-5">

          <h3 className="text-xl font-bold text-white">
            Market Pattern
          </h3>

          <p className="mt-3 text-lg font-semibold text-cyan-400">

            {analysis.pattern ?? "No Pattern"}

          </p>

          <div className="mt-4">

            <div className="flex justify-between mb-2">

              <span className="text-slate-400">

                Reliability

              </span>

              <span className="text-white font-bold">

                {analysis.patternReliability ?? 0}%

              </span>

            </div>

            <div className="h-3 rounded-full bg-slate-700">

              <div
                className="h-full rounded-full bg-cyan-500"
                style={{
                  width: `${analysis.patternReliability ?? 0}%`,
                }}
              />

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

function Band({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div className="rounded-xl bg-slate-900 p-4 border border-slate-700">

      <p className="text-xs uppercase text-slate-400">

        {title}

      </p>

      <p className={`mt-2 text-xl font-bold ${color}`}>

        {value.toFixed(2)}

      </p>

    </div>
  );
}