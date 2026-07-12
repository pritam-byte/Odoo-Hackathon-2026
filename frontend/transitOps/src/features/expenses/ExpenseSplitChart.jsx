// src/features/expenses/ExpenseSplitChart.jsx
import { BarChart3 } from "lucide-react";

export default function ExpenseSplitChart() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col h-full">
      <h3 className="font-semibold text-slate-900 mb-6 flex items-center gap-2">
        Expense Split <span className="text-slate-400 text-xs border rounded-full px-1.5">i</span>
      </h3>
      
      {/* CSS Donut Chart Approximation */}
      <div className="relative w-48 h-48 mx-auto mb-8 flex-shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          {/* Green - Fuel 59% */}
          <circle cx="50" cy="50" r="40" fill="none" stroke="#22c55e" strokeWidth="20" strokeDasharray="148 251" strokeDashoffset="0" />
          {/* Yellow - Maintenance 25% */}
          <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="20" strokeDasharray="63 251" strokeDashoffset="-148" />
          {/* Blue - Tolls 16% */}
          <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="20" strokeDasharray="40 251" strokeDashoffset="-211" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-full m-4">
          <span className="text-lg font-bold text-slate-900">$24,560.75</span>
          <span className="text-xs text-slate-500">Total</span>
        </div>
      </div>

      <div className="space-y-4 flex-grow">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <div>
              <p className="font-medium text-slate-700">Fuel</p>
              <p className="text-green-600 font-semibold">$14,680.40</p>
            </div>
          </div>
          <span className="text-slate-500">59%</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <div>
              <p className="font-medium text-slate-700">Maintenance</p>
              <p className="text-amber-500 font-semibold">$6,250.30</p>
            </div>
          </div>
          <span className="text-slate-500">25%</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <div>
              <p className="font-medium text-slate-700">Tolls</p>
              <p className="text-blue-500 font-semibold">$3,630.05</p>
            </div>
          </div>
          <span className="text-slate-500">16%</span>
        </div>
      </div>

      <button className="w-full mt-6 flex items-center justify-center gap-2 py-2.5 bg-green-50 text-green-700 rounded-lg font-medium hover:bg-green-100 transition">
        <BarChart3 size={16} />
        View Detailed Report
      </button>
    </div>
  );
}