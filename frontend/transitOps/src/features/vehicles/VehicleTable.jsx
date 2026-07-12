import { MoreVertical } from "lucide-react";
import StatusBadge from "../../components/common/StatusBadge";

const columns = [
  { key: "regNo", label: "Registration No." },
  { key: "model", label: "Vehicle Model" },
  { key: "type", label: "Type" },
  { key: "maxLoad", label: "Max Load" },
  { key: "odometer", label: "Odometer" },
  { key: "status", label: "Status" },
];

export default function VehicleTable({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="py-16 text-center text-slate-500">
        No vehicles found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-sm font-semibold text-slate-700 whitespace-nowrap"
              >
                {col.label}
              </th>
            ))}
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {data.map((v) => (
            <tr
              key={v.id}
              className="border-b border-slate-100 hover:bg-slate-50 transition"
            >
              <td className="px-4 py-4 font-medium text-slate-900 whitespace-nowrap">
                {v.regNo}
              </td>
              <td className="px-4 py-4 text-slate-700 whitespace-nowrap">
                {v.model}
              </td>
              <td className="px-4 py-4 text-slate-700 whitespace-nowrap">
                {v.type}
              </td>
              <td className="px-4 py-4 text-slate-700 whitespace-nowrap">
                {v.maxLoad}
              </td>
              <td className="px-4 py-4 text-slate-700 whitespace-nowrap">
                {v.odometer}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <StatusBadge status={v.status} />
              </td>
              <td className="px-4 py-4 text-right">
                <button
                  className="text-slate-400 hover:text-slate-700 p-1 rounded"
                  aria-label={`Actions for ${v.regNo}`}
                >
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