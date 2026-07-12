import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Download } from "lucide-react";

// TODO: replace with real data from backend team's /fuel/cost-by-vehicle endpoint
const MOCK_FUEL_DATA = [
  { vehicle: "BUS-1042", cost: 1820 },
  { vehicle: "BUS-1031", cost: 1650 },
  { vehicle: "BUS-1055", cost: 1420 },
  { vehicle: "BUS-1028", cost: 1210 },
  { vehicle: "VAN-2007", cost: 980 },
  { vehicle: "VAN-2012", cost: 870 },
  { vehicle: "BUS-1046", cost: 760 },
  { vehicle: "BUS-1033", cost: 690 },
  { vehicle: "BUS-1021", cost: 560 },
  { vehicle: "VAN-2003", cost: 480 },
];

export default function FuelCostChart() {
  const [range, setRange] = useState("This Week");
  const totalCost = useMemo(() => MOCK_FUEL_DATA.reduce((sum, d) => sum + d.cost, 0), []);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900">Fuel Cost by Vehicle</h3>
        <div className="flex items-center gap-2">
          <select value={range} onChange={(e) => setRange(e.target.value)} className="border border-slate-300 rounded-lg text-sm px-3 py-1.5 outline-none focus:border-blue-600">
            <option>This Week</option>
            <option>This Month</option>
            <option>This Quarter</option>
          </select>
          <button className="inline-flex items-center gap-1.5 border border-slate-300 rounded-lg text-sm px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-50">
            <Download size={15} />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={MOCK_FUEL_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef2f7" />
              <XAxis dataKey="vehicle" tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false} />
              <YAxis tickFormatter={(v) => `$${v}`} tick={{ fontSize: 12, fill: "#64748b" }} tickLine={false} axisLine={false} />
              <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, "Cost"]} contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 13 }} />
              <Bar dataKey="cost" radius={[6, 6, 0, 0]} barSize={28}>
                {MOCK_FUEL_DATA.map((entry, i) => (
                  <Cell key={i} fill="#2563eb" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-50 rounded-xl p-5 flex flex-col justify-center">
          <p className="text-sm text-slate-500">Total Fuel Cost</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">${totalCost.toLocaleString()}</p>
          <p className="text-sm text-green-600 font-medium mt-2">↓ 4.8% vs last week</p>
        </div>
      </div>
    </div>
  );
}