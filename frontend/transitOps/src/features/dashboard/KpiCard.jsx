export default function KpiCard({ icon, iconBg, iconColor, label, value, delta, deltaDirection = "up", deltaGood = true }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: iconBg, color: iconColor }}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="text-2xl font-bold text-slate-900 leading-tight">{value}</p>
        <p className={`text-xs font-medium mt-0.5 ${deltaGood ? "text-green-600" : "text-red-500"}`}>
          {deltaDirection === "up" ? "↑" : "↓"} {delta}
        </p>
      </div>
    </div>
  );
}