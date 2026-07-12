import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Download } from "lucide-react";
import { useFleet } from "../../context/FleetContext";

export default function FuelCostChart() {
  const { vehicles } = useFleet();

  const data = useMemo(
    () =>
      vehicles
        .filter((v) => v.fuelCost > 0)
        .map((v) => ({ vehicle: v.regNo, cost: v.fuelCost }))
        .sort((a, b) => b.cost - a.cost),
    [vehicles]
  );

  const totalCost = useMemo(() => data.reduce((sum, d) => sum + d.cost, 0), [data]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900">Fuel Cost by Vehicle</h3>
        <button className="inline-flex items-center gap-1.5 border border-slate-300 rounded-lg text-sm px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-50">
          <Download size={15} />
          Export
        </button>
      </div>

      {data.length === 0 ? (
        <p className="py-10 text-center text-slate-500 text-sm">No fuel cost data recorded yet.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef2f7" />
                <XAxis dataKey="vehicle" tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false} />
                <YAxis tickFormatter={(v) => `$${v}`} tick={{ fontSize: 12, fill: "#64748b" }} tickLine={false} axisLine={false} />
                <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, "Cost"]} contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 13 }} />
                <Bar dataKey="cost" radius={[6, 6, 0, 0]} barSize={28}>
                  {data.map((entry, i) => (
                    <Cell key={i} fill="#2563eb" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-slate-50 rounded-xl p-5 flex flex-col justify-center">
            <p className="text-sm text-slate-500">Total Fuel Cost</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">${totalCost.toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
}