import { useState, useEffect } from "react";
import { Bus, CheckCircle2, Wrench, Route as RouteIcon, PieChart } from "lucide-react";
import KpiCard from "../features/dashboard/KpiCard";
import FleetUtilizationChart from "../features/dashboard/FleetUtilizationChart";
import TripActivityTable from "../features/dashboard/TripActivityTable";
import FuelCostChart from "../features/dashboard/FuelCostChart";

export default function DashboardPage() {
  const [kpis, setKpis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKpis = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/dashboard/kpis");
        if (!response.ok) {
          throw new Error("Failed to fetch KPIs");
        }
        const result = await response.json();
        setKpis(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchKpis();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Fleet Overview</h1>
        <div className="flex flex-wrap gap-3">
          <select className="border border-slate-300 rounded-lg text-sm px-3 py-2 outline-none focus:border-blue-600 bg-white">
            <option>All Regions</option>
            <option>North</option>
            <option>South</option>
            <option>East</option>
            <option>West</option>
          </select>
          <select className="border border-slate-300 rounded-lg text-sm px-3 py-2 outline-none focus:border-blue-600 bg-white">
            <option>All Types</option>
            <option>Coach</option>
            <option>Minibus</option>
            <option>City Bus</option>
            <option>Box Truck</option>
          </select>
          <button className="border border-slate-300 rounded-lg text-sm px-3 py-2 font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap">
            📅 May 18 – May 24, 2025
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <KpiCard icon={<Bus size={22} />} iconBg="#dbeafe" iconColor="#2563eb" label="Active Vehicles" value={kpis?.activeVehicles || 0} delta="Live DB" deltaGood />
        <KpiCard icon={<CheckCircle2 size={22} />} iconBg="#dcfce7" iconColor="#16a34a" label="Available Vehicles" value={kpis?.availableVehicles || 0} delta="Live DB" deltaGood />
        <KpiCard icon={<Wrench size={22} />} iconBg="#fef3c7" iconColor="#d97706" label="In Maintenance" value={kpis?.vehiclesInMaintenance || 0} delta="Live DB" deltaGood={false} />
        <KpiCard icon={<RouteIcon size={22} />} iconBg="#ede9fe" iconColor="#7c3aed" label="Active Trips" value={kpis?.activeTrips || 0} delta="Live DB" deltaGood />
        <KpiCard icon={<PieChart size={22} />} iconBg="#cffafe" iconColor="#0891b2" label="Fleet Utilization" value={`${kpis?.fleetUtilization || 0}%`} delta="Live DB" deltaGood />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <div className="xl:col-span-2">
          <FleetUtilizationChart />
        </div>
        <TripActivityTable />
      </div>

      <FuelCostChart />
    </div>
  );
}