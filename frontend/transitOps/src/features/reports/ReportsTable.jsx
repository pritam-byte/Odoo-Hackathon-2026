// src/features/reports/ReportsTable.jsx
import { TrendingUp } from "lucide-react";

const columns = [
  { key: "id", label: "Vehicle ID" },
  { key: "model", label: "Model" },
  { key: "region", label: "Region" },
  { key: "rev", label: "Revenue (USD)" },
  { key: "cost", label: "Total Cost (USD)" },
  { key: "roi", label: "ROI (%)" },
  { key: "trend", label: "ROI Trend" },
];

export default function ReportsTable({ data }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="p-5 border-b border-slate-200">
        <h3 className="font-semibold text-slate-900">Vehicle ROI</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-sm">
              {columns.map((col) => (
                <th key={col.key} className="px-5 py-3 font-semibold text-slate-700 whitespace-nowrap">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition text-sm">
                <td className="px-5 py-4 font-medium text-slate-900 whitespace-nowrap">{row.id}</td>
                <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{row.model}</td>
                <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{row.region}</td>
                <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{row.rev}</td>
                <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{row.cost}</td>
                <td className="px-5 py-4 font-semibold text-green-600 whitespace-nowrap">{row.roi}</td>
                <td className="px-5 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <svg className="w-12 h-4 text-green-500 overflow-visible" viewBox="0 0 50 20">
                       <polyline fill="none" stroke="currentColor" strokeWidth="2" points="0,15 10,10 20,12 30,5 40,8 50,2" />
                    </svg>
                    <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs font-medium border border-green-100">
                      <TrendingUp size={12} /> {row.trend}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}