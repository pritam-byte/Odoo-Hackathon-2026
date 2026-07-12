// src/features/reports/ReportKPICard.jsx
import { TrendingUp, TrendingDown } from "lucide-react";

export default function ReportKPICard({ title, icon: Icon, value, trend, trendUp, period, colorClass, sparkline }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
      <h3 className="text-slate-800 font-semibold mb-4">{title}</h3>
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass}`}>
              <Icon size={20} />
            </div>
            <span className="text-2xl font-bold text-slate-900">{value}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium">
            {trendUp ? (
              <span className="flex items-center text-green-600"><TrendingUp size={14} className="mr-1" />{trend}</span>
            ) : (
              <span className="flex items-center text-red-600"><TrendingDown size={14} className="mr-1" />{trend}</span>
            )}
            <span className="text-slate-400">vs {period}</span>
          </div>
        </div>
        
        {/* Simple SVG Sparkline */}
        <div className="w-24 h-12">
          <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
            <polyline 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              points={sparkline} 
              className={trendUp ? "text-green-500" : (colorClass.includes("blue") ? "text-blue-500" : (colorClass.includes("purple") ? "text-purple-500" : "text-orange-500"))}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}