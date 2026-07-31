interface IndicatorCardProps {
  title: string;
  value: number | string;
}

export default function IndicatorCard({
  title,
  value,
}: IndicatorCardProps) {
  return (
    <div className="rounded-xl bg-gray-900 border border-gray-800 p-5 shadow-lg">

      <p className="text-sm text-gray-400">
        {title}
      </p>

      <h2 className="text-2xl font-bold text-white mt-2">
        {value}
      </h2>

    </div>
  );
}