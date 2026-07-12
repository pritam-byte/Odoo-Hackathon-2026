// src/features/expenses/ExpensesPage.jsx
import { Droplet, FileText, DollarSign, Wrench, Gauge, Calendar, Filter } from "lucide-react";
import KPICard from "./KPICard";
import FuelLogTable from "./FuelLogTable";
import ExpenseSplitChart from "./ExpenseSplitChart";

const MOCK_FUEL_LOG = [
  { date: "May 20, 2025", vehicle: "BUS-101", liters: "120.50", cost: "$156.65" },
  { date: "May 20, 2025", vehicle: "BUS-102", liters: "95.20", cost: "$123.76" },
  { date: "May 19, 2025", vehicle: "BUS-103", liters: "110.00", cost: "$143.00" },
  { date: "May 19, 2025", vehicle: "BUS-104", liters: "88.30", cost: "$114.79" },
  { date: "May 18, 2025", vehicle: "BUS-101", liters: "130.75", cost: "$169.98" },
  { date: "May 18, 2025", vehicle: "BUS-105", liters: "102.40", cost: "$132.11" },
  { date: "May 17, 2025", vehicle: "BUS-102", liters: "90.60", cost: "$116.81" },
  { date: "May 17, 2025", vehicle: "BUS-103", liters: "115.30", cost: "$149.24" },
];

export default function ExpensesPage() {
  return (
    <div className="p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Fuel & Expenses</h1>
        <div className="flex gap-3">
          <button className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2.5 rounded-lg transition">
            <Droplet size={18} />
            Add Fuel Log
          </button>
          <button className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-4 py-2.5 rounded-lg transition">
            <FileText size={18} />
            Add Expense
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard 
          title="Total Operational Cost" 
          value="$24,560.75" 
          icon={DollarSign} 
          trend="8.6%" 
          colorClass="bg-green-100 text-green-600" 
        />
        <KPICard 
          title="Fuel Cost" 
          value="$14,680.40" 
          icon={Droplet} 
          trend="7.3%" 
          colorClass="bg-green-100 text-green-600" 
        />
        <KPICard 
          title="Maintenance Cost" 
          value="$6,250.30" 
          icon={Wrench} 
          trend="5.1%" 
          colorClass="bg-amber-100 text-amber-600" 
        />
        <KPICard 
          title="Fuel Efficiency" 
          value="3.45 km/l" 
          icon={Gauge} 
          trend="6.2%" 
          colorClass="bg-green-100 text-green-600" 
        />
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Fuel Log Table */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 className="font-semibold text-slate-900 text-lg">Fuel Log</h3>
            <div className="flex gap-3">
              <button className="inline-flex items-center gap-2 px-3 py-1.5 border border-slate-300 rounded-lg text-sm text-slate-700 hover:bg-slate-50 transition">
                <Calendar size={16} />
                Date Range
              </button>
              <button className="inline-flex items-center gap-2 px-3 py-1.5 border border-slate-300 rounded-lg text-sm text-slate-700 hover:bg-slate-50 transition">
                <Filter size={16} />
                Filters
              </button>
            </div>
          </div>
          
          <FuelLogTable data={MOCK_FUEL_LOG} />
          
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-slate-500">Showing 1 to 8 of 50 entries</p>
            {/* Simple Pagination Placeholder */}
            <div className="flex gap-1">
              <span className="w-8 h-8 flex items-center justify-center rounded bg-green-500 text-white text-sm">1</span>
              <span className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 text-slate-700 text-sm cursor-pointer">2</span>
              <span className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 text-slate-700 text-sm cursor-pointer">...</span>
            </div>
          </div>
        </div>

        {/* Right: Expense Split */}
        <div>
          <ExpenseSplitChart />
        </div>
      </div>
    </div>
  );
}