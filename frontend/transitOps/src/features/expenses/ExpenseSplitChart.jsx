// src/features/expenses/ExpenseSplitChart.jsx
import { BarChart3 } from "lucide-react";

export default function ExpenseSplitChart({ fuelCost, maintenanceCost, tollsCost, totalCost }) {
  // Calculate dynamic percentages
  const fuelPct = totalCost > 0 ? Math.round((fuelCost / totalCost) * 100) : 0;
  const maintPct = totalCost > 0 ? Math.round((maintenanceCost / totalCost) * 100) : 0;
  const tollsPct = totalCost > 0 ? Math.round((tollsCost / totalCost) * 100) : 0;

  // SVG Math: Circumference of circle with r=40 is ~251.2
  const circumference = 251.2;
  const fuelDash = (fuelPct / 100) * circumference;
  const maintDash = (maintPct / 100) * circumference;
  const tollsDash = (tollsPct / 100) * circumference;

  // Offsets for positioning the segments
  const fuelOffset = 0;
  const maintOffset = -fuelDash;
  const tollsOffset = maintOffset - maintDash;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col h-full">
      <h3 className="font-semibold text-slate-900 mb-6 flex items-center gap-2">
        Expense Split <span className="text-slate-400 text-xs border rounded-full px-1.5">i</span>
      </h3>
      
      <div className="relative w-48 h-48 mx-auto mb-8 flex-shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="20" />
          {/* Green - Fuel */}
          <circle cx="50" cy="50" r="40" fill="none" stroke="#22c55e" strokeWidth="20" strokeDasharray={`${fuelDash} ${circumference}`} strokeDashoffset={fuelOffset} />
          {/* Yellow - Maintenance */}
          <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="20" strokeDasharray={`${maintDash} ${circumference}`} strokeDashoffset={maintOffset} />
          {/* Blue - Tolls */}
          <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="20" strokeDasharray={`${tollsDash} ${circumference}`} strokeDashoffset={tollsOffset} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-full m-4 text-center">
          <span className="text-lg font-bold text-slate-900">${totalCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
          <span className="text-xs text-slate-500">Total</span>
        </div>
      </div>

      <div className="space-y-4 flex-grow">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <div>
              <p className="font-medium text-slate-700">Fuel</p>
              <p className="text-green-600 font-semibold">${fuelCost.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
            </div>
          </div>
          <span className="text-slate-500">{fuelPct}%</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <div>
              <p className="font-medium text-slate-700">Maintenance</p>
              <p className="text-amber-500 font-semibold">${maintenanceCost.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
            </div>
          </div>
          <span className="text-slate-500">{maintPct}%</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <div>
              <p className="font-medium text-slate-700">Tolls</p>
              <p className="text-blue-500 font-semibold">${tollsCost.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
            </div>
          </div>
          <span className="text-slate-500">{tollsPct}%</span>
        </div>
      </div>

      <button className="w-full mt-6 flex items-center justify-center gap-2 py-2.5 bg-green-50 text-green-700 rounded-lg font-medium hover:bg-green-100 transition">
        <BarChart3 size={16} />
        View Detailed Report
      </button>
    </div>
  );
}