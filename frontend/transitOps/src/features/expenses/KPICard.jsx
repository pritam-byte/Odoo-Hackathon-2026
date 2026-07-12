// src/features/expenses/KPICard.jsx
import { TrendingUp } from "lucide-react";

export default function KPICard({ title, value, icon: Icon, trend, colorClass }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <h3 className="text-slate-500 font-medium text-sm mb-3">{title}</h3>
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClass}`}>
          <Icon size={24} />
        </div>
        <span className="text-2xl font-bold text-slate-900">{value}</span>
      </div>
      <div className="flex items-center gap-1.5 text-sm">
        <TrendingUp size={16} className="text-green-500" />
        <span className="text-green-600 font-medium">{trend}</span>
        <span className="text-slate-400 ml-1">vs last month</span>
      </div>
    </div>
  );
}