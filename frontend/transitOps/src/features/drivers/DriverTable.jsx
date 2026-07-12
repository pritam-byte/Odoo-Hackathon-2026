// src/features/drivers/DriverTable.jsx
import { MoreVertical } from "lucide-react";
import StatusBadge from "../../components/common/StatusBadge";

// Custom component for the semi-circle gauge
const SafetyScore = ({ score }) => {
  let colorClass = "text-green-500";
  if (score < 80) colorClass = "text-amber-500";
  if (score < 60) colorClass = "text-red-500";
  
  const circumference = 31.4; // Math.PI * radius (10)
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex items-center gap-2">
      <svg className="w-6 h-4 overflow-visible" viewBox="0 0 24 14">
        <path d="M 2 12 A 10 10 0 0 1 22 12" fill="none" stroke="#f1f5f9" strokeWidth="4" strokeLinecap="round" />
        <path 
          d="M 2 12 A 10 10 0 0 1 22 12" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeDasharray={circumference} 
          strokeDashoffset={offset} 
          className={colorClass} 
        />
      </svg>
      <span className="font-semibold text-slate-700">{score}</span>
    </div>
  );
};

const columns = [
  { key: "driverName", label: "Driver Name" },
  { key: "licenseNumber", label: "License Number" },
  { key: "licenseCategory", label: "License Category" },
  { key: "licenseExpiry", label: "License Expiry" },
  { key: "safetyScore", label: "Safety Score" },
  { key: "status", label: "Status" },
];

export default function DriverTable({ data }) {
  if (!data || data.length === 0) {
    return <div className="py-16 text-center text-slate-500">No drivers found.</div>;
  }

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
          {data.map((d) => (
            <tr key={d.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${d.color}`}>
                    {d.initials}
                  </div>
                  <span className="font-medium text-slate-900">{d.name}</span>
                </div>
              </td>
              <td className="px-4 py-4 text-slate-700 whitespace-nowrap">{d.license}</td>
              <td className="px-4 py-4 text-slate-700 whitespace-nowrap">{d.category}</td>
              <td className="px-4 py-4 whitespace-nowrap">
                <span className={`font-medium ${d.warning ? "text-amber-600" : "text-slate-700"}`}>
                  {d.expiry} {d.warning && "⚠️"}
                </span>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <SafetyScore score={d.score} />
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <StatusBadge status={d.status} />
              </td>
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