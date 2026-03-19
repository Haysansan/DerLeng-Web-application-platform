import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function StatCard({
  title,
  value,
  change,
  icon: Icon,
  accent = "green",
}) {
  const isPositive = change >= 0;

  const accentStyles = {
    green: {
      bg: "bg-green-50",
      iconBg: "bg-green-200",
      iconColor: "text-green-700",
    },
    blue: {
      bg: "bg-blue-50",
      iconBg: "bg-blue-200",
      iconColor: "text-blue-700",
    },
    purple: {
      bg: "bg-purple-50",
      iconBg: "bg-purple-200",
      iconColor: "text-purple-700",
    },
    orange: {
      bg: "bg-orange-50",
      iconBg: "bg-orange-200",
      iconColor: "text-orange-700",
    },
    rose: {
      bg: "bg-rose-50",
      iconBg: "bg-rose-200",
      iconColor: "text-rose-700",
    },
  };

  const style = accentStyles[accent];

  return (
    <div
      className={`p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 ${style.bg}`}
    >
      {/* Title */}
      <p className="text-sm text-gray-600 mb-4">{title}</p>

      {/* Number LEFT - Icon RIGHT */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">{value}</h2>

        {Icon && (
          <div className={`p-3 rounded-xl ${style.iconBg}`}>
            <Icon className={style.iconColor} size={26} />
          </div>
        )}
      </div>

      {/* Optional Change */}
      {typeof change === "number" && (
        <div
          className={`flex items-center gap-1 mt-4 text-sm font-medium ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPositive ? (
            <ArrowUpRight size={16} />
          ) : (
            <ArrowDownRight size={16} />
          )}
          {Math.abs(change)}% from last month
        </div>
      )}
    </div>
  );
}
