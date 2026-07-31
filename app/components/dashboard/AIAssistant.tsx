"use client";

interface Props {
  signal: string;
  confidence: number;
  trend: string;
  reason: string;

  entry: number;
  stopLoss: number;

  takeProfit1: number;
  takeProfit2: number;
  takeProfit3: number;

  risk: string;
}

export default function AIAssistant({
  signal,
  confidence,
  trend,
  reason,
  entry,
  stopLoss,
  takeProfit1,
  takeProfit2,
  takeProfit3,
  risk,
}: Props) {
  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-xl">

      <h2 className="text-xl font-bold text-white mb-4">
        🤖 TradeVision AI
      </h2>

      <div className="space-y-3 text-sm">

        <div>
          <span className="text-slate-400">Signal</span>

          <p className="font-bold text-green-400">
            {signal}
          </p>
        </div>

        <div>
          <span className="text-slate-400">Confidence</span>

          <p className="text-blue-400 font-bold">
            {confidence}%
          </p>
        </div>

        <div>
          <span className="text-slate-400">Trend</span>

          <p className="text-white">
            {trend}
          </p>
        </div>

        <div>
          <span className="text-slate-400">Reason</span>

          <p className="text-slate-300 leading-6">
            {reason}
          </p>
        </div>

        <hr className="border-slate-700" />

        <div className="grid grid-cols-2 gap-3">

          <div>
            <span className="text-slate-400">Entry</span>

            <p className="text-green-400 font-bold">
              {entry}
            </p>
          </div>

          <div>
            <span className="text-slate-400">Stop Loss</span>

            <p className="text-red-400 font-bold">
              {stopLoss}
            </p>
          </div>

          <div>
            <span className="text-slate-400">TP1</span>

            <p className="text-blue-400">
              {takeProfit1}
            </p>
          </div>

          <div>
            <span className="text-slate-400">TP2</span>

            <p className="text-blue-400">
              {takeProfit2}
            </p>
          </div>

          <div>
            <span className="text-slate-400">TP3</span>

            <p className="text-blue-400">
              {takeProfit3}
            </p>
          </div>

          <div>
            <span className="text-slate-400">Risk</span>

            <p className="text-yellow-400 font-bold">
              {risk}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}