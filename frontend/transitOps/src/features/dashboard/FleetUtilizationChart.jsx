import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useFleet } from "../../context/FleetContext";

const STATUS_COLORS = {
  Available: "#22c55e",
  "On Trip": "#2563eb",
  "In Shop": "#f59e0b",
  Retired: "#94a3b8",
};

export default function FleetUtilizationChart() {
  const { vehicles } = useFleet();

  const statusCounts = useMemo(() => {
    const counts = { Available: 0, "On Trip": 0, "In Shop": 0, Retired: 0 };
    vehicles.forEach((v) => {
      if (counts[v.status] !== undefined) counts[v.status] += 1;
    });
    return Object.entries(counts).map(([status, count]) => ({ status, count }));
  }, [vehicles]);

  const totalVehicles = vehicles.length;
  const onTrip = vehicles.filter((v) => v.status === "On Trip").length;
  const available = vehicles.filter((v) => v.status === "Available").length;
  const inShop = vehicles.filter((v) => v.status === "In Shop").length;
  const utilization = totalVehicles === 0 ? 0 : Math.round((onTrip / totalVehicles) * 100);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900">Fleet Status Right Now</h3>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={statusCounts} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef2f7" />
          <XAxis dataKey="status" tick={{ fontSize: 12, fill: "#64748b" }} tickLine={false} axisLine={false} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: "#64748b" }} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 13 }} />
          <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={48}>
            {statusCounts.map((entry, i) => (
              <Cell key={i} fill={STATUS_COLORS[entry.status]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-slate-100">
        <div>
          <p className="text-xs text-slate-500">Total Vehicles</p>
          <p className="text-xl font-bold text-slate-900">{totalVehicles}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Currently On Trip</p>
          <p className="text-xl font-bold text-slate-900">{onTrip}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Available Now</p>
          <p className="text-xl font-bold text-slate-900">{available}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Utilization</p>
          <p className="text-xl font-bold text-slate-900">{utilization}%</p>
          <p className="text-xs text-slate-400">{inShop} in shop</p>
        </div>
      </div>
    </div>
  );
}