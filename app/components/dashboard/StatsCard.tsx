interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
}

export default function StatsCard({
  title,
  value,
  subtitle,
}: StatsCardProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg hover:border-green-500 transition-all duration-300">
      <p className="text-gray-400 text-sm">{title}</p>

      <h2 className="text-3xl font-bold text-white mt-2">
        {value}
      </h2>

      {subtitle && (
        <p className="text-green-400 text-sm mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}