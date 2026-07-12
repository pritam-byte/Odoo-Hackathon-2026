import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// TODO: replace with real data from backend team's /analytics/fleet-utilization endpoint
const MOCK_DATA = [
  { day: "May 18\nSun", utilization: 72, activeVehicles: 112 },
  { day: "May 19\nMon", utilization: 75, activeVehicles: 118 },
  { day: "May 20\nTue", utilization: 80, activeVehicles: 126 },
  { day: "May 21\nWed", utilization: 82, activeVehicles: 132 },
  { day: "May 22\nThu", utilization: 78, activeVehicles: 125 },
  { day: "May 23\nFri", utilization: 77, activeVehicles: 123 },
  { day: "May 24\nSat", utilization: 79, activeVehicles: 128 },
];

export default function FleetUtilizationChart() {
  const avgUtilization = Math.round(
    MOCK_DATA.reduce((sum, d) => sum + d.utilization, 0) / MOCK_DATA.length
  );
  const totalActiveHours = MOCK_DATA.reduce((sum, d) => sum + d.activeVehicles, 0) * 8;
  const totalAvailableHours = Math.round(totalActiveHours * 1.28);
  const peak = MOCK_DATA.reduce((max, d) => (d.utilization > max.utilization ? d : max), MOCK_DATA[0]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900">Fleet Utilization</h3>
        <select className="border border-slate-300 rounded-lg text-sm px-3 py-1.5 outline-none focus:border-blue-600">
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={MOCK_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef2f7" />
          <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#64748b" }} tickLine={false} axisLine={false} />
          <YAxis
            yAxisId="left"
            tickFormatter={(v) => `${v}%`}
            tick={{ fontSize: 12, fill: "#64748b" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 12, fill: "#64748b" }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 13 }} />
          <Legend wrapperStyle={{ fontSize: 13 }} />
          <Bar yAxisId="right" dataKey="activeVehicles" name="Active Vehicles" fill="#bfdbfe" radius={[4, 4, 0, 0]} barSize={32} />
          <Line yAxisId="left" type="monotone" dataKey="utilization" name="Utilization (%)" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 4, fill: "#2563eb" }} />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-slate-100">
        <div>
          <p className="text-xs text-slate-500">Average Utilization</p>
          <p className="text-xl font-bold text-slate-900">{avgUtilization}%</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Total Active Vehicle Hours</p>
          <p className="text-xl font-bold text-slate-900">{totalActiveHours.toLocaleString()} hrs</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Total Available Hours</p>
          <p className="text-xl font-bold text-slate-900">{totalAvailableHours.toLocaleString()} hrs</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Peak Utilization</p>
          <p className="text-xl font-bold text-slate-900">{peak.utilization}%</p>
          <p className="text-xs text-slate-400">{peak.day.replace("\n", ", ")}</p>
        </div>
      </div>
    </div>
  );
}