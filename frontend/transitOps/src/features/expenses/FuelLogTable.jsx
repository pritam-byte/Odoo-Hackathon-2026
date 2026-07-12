// src/features/expenses/FuelLogTable.jsx
import { MoreVertical } from "lucide-react";

const columns = [
  { key: "date", label: "Date" },
  { key: "vehicle", label: "Vehicle" },
  { key: "liters", label: "Liters" },
  { key: "cost", label: "Cost" },
];

export default function FuelLogTable({ data }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 text-sm font-semibold text-slate-700 whitespace-nowrap">
                {col.label}
              </th>
            ))}
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition">
              <td className="px-4 py-4 text-slate-700 whitespace-nowrap">{row.date}</td>
              <td className="px-4 py-4 text-slate-700 whitespace-nowrap">{row.vehicle}</td>
              <td className="px-4 py-4 text-slate-700 whitespace-nowrap">{row.liters}</td>
              <td className="px-4 py-4 text-slate-900 font-medium whitespace-nowrap">{row.cost}</td>
              <td className="px-4 py-4 text-right">
                <button className="text-slate-400 hover:text-slate-700 p-1 rounded">
                  <MoreVertical size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}