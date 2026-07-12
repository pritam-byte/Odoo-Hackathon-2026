// src/features/expenses/ExpensesPage.jsx
import { useState, useMemo } from "react";
import { Droplet, FileText, DollarSign, Wrench, Gauge, X } from "lucide-react";
import KPICard from "./KPICard";
import FuelLogTable from "./FuelLogTable";
import ExpenseSplitChart from "./ExpenseSplitChart";

// Convert mock strings to raw numbers/dates for math & sorting
const INITIAL_FUEL_LOGS = [
  { id: 1, date: "2025-05-20", vehicle: "BUS-101", liters: 120.50, cost: 156.65 },
  { id: 2, date: "2025-05-20", vehicle: "BUS-102", liters: 95.20, cost: 123.76 },
  { id: 3, date: "2025-05-19", vehicle: "BUS-103", liters: 110.00, cost: 143.00 },
  { id: 4, date: "2025-05-19", vehicle: "BUS-104", liters: 88.30, cost: 114.79 },
  { id: 5, date: "2025-05-18", vehicle: "BUS-101", liters: 130.75, cost: 169.98 },
  { id: 6, date: "2025-05-18", vehicle: "BUS-105", liters: 102.40, cost: 132.11 },
  { id: 7, date: "2025-05-17", vehicle: "BUS-102", liters: 90.60, cost: 116.81 },
  { id: 8, date: "2025-05-17", vehicle: "BUS-103", liters: 115.30, cost: 149.24 },
  { id: 9, date: "2025-05-16", vehicle: "BUS-101", liters: 105.00, cost: 140.00 },
];

export default function ExpensesPage() {
  // --- STATE ---
  const [fuelLogs, setFuelLogs] = useState(INITIAL_FUEL_LOGS);
  
  // Historical bases to make KPIs look like a full enterprise app, combined with live table data
  const [baseMaintenanceCost, setBaseMaintenanceCost] = useState(6250.30);
  const [baseTollsCost] = useState(3630.05); 
  const historicalFuelCost = 13570.06; 
  const historicalLiters = 4130.5;

  // Filters & Pagination
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Modals
  const [isFuelModalOpen, setIsFuelModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  // --- KPI LOGIC (Dynamically Calculated) ---
  const tableFuelCost = fuelLogs.reduce((sum, log) => sum + log.cost, 0);
  const tableLiters = fuelLogs.reduce((sum, log) => sum + log.liters, 0);

  const totalFuelCost = historicalFuelCost + tableFuelCost;
  const totalLiters = historicalLiters + tableLiters;
  
  // Fake total distance logic: assume ~3.5 km per liter on average
  const totalDistance = totalLiters * 3.45; 
  const fuelEfficiency = totalLiters > 0 ? (totalDistance / totalLiters).toFixed(2) : "0.00";

  const totalOperationalCost = totalFuelCost + baseMaintenanceCost + baseTollsCost;

  // --- FILTER & SORT LOGIC ---
  const processedLogs = useMemo(() => {
    let result = [...fuelLogs];

    if (startDate) result = result.filter(log => log.date >= startDate);
    if (endDate) result = result.filter(log => log.date <= endDate);

    result.sort((a, b) => {
      if (sortBy === "date-desc") return new Date(b.date) - new Date(a.date);
      if (sortBy === "date-asc") return new Date(a.date) - new Date(b.date);
      if (sortBy === "cost-desc") return b.cost - a.cost;
      if (sortBy === "cost-asc") return a.cost - b.cost;
      if (sortBy === "liters-desc") return b.liters - a.liters;
      if (sortBy === "liters-asc") return a.liters - b.liters;
      return 0;
    });

    return result;
  }, [fuelLogs, startDate, endDate, sortBy]);

  // --- PAGINATION LOGIC ---
  const totalEntries = processedLogs.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = processedLogs.slice(indexOfFirstItem, indexOfLastItem);
  
  const showingStart = totalEntries === 0 ? 0 : indexOfFirstItem + 1;
  const showingEnd = Math.min(indexOfLastItem, totalEntries);

  // --- HANDLERS ---
  const handleAddFuel = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newLog = {
      id: Date.now(),
      date: formData.get("date"),
      vehicle: formData.get("vehicle"),
      liters: parseFloat(formData.get("liters")),
      cost: parseFloat(formData.get("cost")),
    };
    setFuelLogs([newLog, ...fuelLogs]);
    setIsFuelModalOpen(false);
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    const amount = parseFloat(new FormData(e.target).get("amount"));
    setBaseMaintenanceCost(prev => prev + amount); // Adding to maintenance for demo purposes
    setIsExpenseModalOpen(false);
  };

  return (
    <div className="p-6 sm:p-8 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Fuel & Expenses</h1>
        <div className="flex gap-3">
          <button onClick={() => setIsFuelModalOpen(true)} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2.5 rounded-lg transition">
            <Droplet size={18} /> Add Fuel Log
          </button>
          <button onClick={() => setIsExpenseModalOpen(true)} className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-4 py-2.5 rounded-lg transition">
            <FileText size={18} /> Add Expense
          </button>
        </div>
      </div>

      {/* Dynamic KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard title="Total Operational Cost" value={`$${totalOperationalCost.toLocaleString(undefined, {minimumFractionDigits: 2})}`} icon={DollarSign} trend="8.6%" colorClass="bg-green-100 text-green-600" />
        <KPICard title="Fuel Cost" value={`$${totalFuelCost.toLocaleString(undefined, {minimumFractionDigits: 2})}`} icon={Droplet} trend="7.3%" colorClass="bg-green-100 text-green-600" />
        <KPICard title="Maintenance Cost" value={`$${baseMaintenanceCost.toLocaleString(undefined, {minimumFractionDigits: 2})}`} icon={Wrench} trend="5.1%" colorClass="bg-amber-100 text-amber-600" />
        <KPICard title="Fuel Efficiency" value={`${fuelEfficiency} km/l`} icon={Gauge} trend="6.2%" colorClass="bg-green-100 text-green-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Fuel Log Table */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col">
          
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6 bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500 font-medium">From:</span>
              <input type="date" value={startDate} onChange={(e) => {setStartDate(e.target.value); setCurrentPage(1);}} className="text-sm border-slate-300 rounded outline-none p-1.5" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500 font-medium">To:</span>
              <input type="date" value={endDate} onChange={(e) => {setEndDate(e.target.value); setCurrentPage(1);}} className="text-sm border-slate-300 rounded outline-none p-1.5" />
            </div>
            <div className="flex items-center gap-2 sm:ml-auto">
              <span className="text-sm text-slate-500 font-medium">Sort:</span>
              <select value={sortBy} onChange={(e) => {setSortBy(e.target.value); setCurrentPage(1);}} className="text-sm border-slate-300 rounded outline-none p-1.5 bg-white">
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="cost-desc">Cost (High to Low)</option>
                <option value="cost-asc">Cost (Low to High)</option>
                <option value="liters-desc">Liters (High to Low)</option>
              </select>
            </div>
            {(startDate || endDate || sortBy !== 'date-desc') && (
              <button onClick={() => {setStartDate(""); setEndDate(""); setSortBy("date-desc");}} className="text-sm text-blue-600 hover:underline">Reset</button>
            )}
          </div>
          
          <div className="flex-grow">
            <FuelLogTable data={currentItems} />
          </div>
          
          {/* Dynamic Pagination */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
            <p className="text-sm text-slate-500">Showing {showingStart} to {showingEnd} of {totalEntries} entries</p>
            <div className="flex gap-1">
              <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} className="px-3 py-1 text-sm rounded hover:bg-slate-100 disabled:opacity-50">Prev</button>
              <span className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded font-medium">{currentPage}</span>
              <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages || totalPages === 0} className="px-3 py-1 text-sm rounded hover:bg-slate-100 disabled:opacity-50">Next</button>
            </div>
          </div>
        </div>

        {/* Right: Expense Split */}
        <div>
          <ExpenseSplitChart fuelCost={totalFuelCost} maintenanceCost={baseMaintenanceCost} tollsCost={baseTollsCost} totalCost={totalOperationalCost} />
        </div>
      </div>

      {/* --- MODALS --- */}
      {isFuelModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
          <form onSubmit={handleAddFuel} className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Fuel Log</h2>
              <button type="button" onClick={() => setIsFuelModalOpen(false)}><X className="text-slate-400" /></button>
            </div>
            <div className="space-y-4 mb-6">
              <div><label className="text-sm font-medium">Date</label><input required name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full border rounded p-2 mt-1" /></div>
              <div><label className="text-sm font-medium">Vehicle</label><input required name="vehicle" type="text" placeholder="e.g. BUS-101" className="w-full border rounded p-2 mt-1" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-sm font-medium">Liters</label><input required name="liters" type="number" step="0.01" className="w-full border rounded p-2 mt-1" /></div>
                <div><label className="text-sm font-medium">Cost ($)</label><input required name="cost" type="number" step="0.01" className="w-full border rounded p-2 mt-1" /></div>
              </div>
            </div>
            <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600">Save Fuel Log</button>
          </form>
        </div>
      )}

      {isExpenseModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
          <form onSubmit={handleAddExpense} className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Maintenance Expense</h2>
              <button type="button" onClick={() => setIsExpenseModalOpen(false)}><X className="text-slate-400" /></button>
            </div>
            <div className="space-y-4 mb-6">
              <div><label className="text-sm font-medium">Date</label><input required type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full border rounded p-2 mt-1" /></div>
              <div><label className="text-sm font-medium">Description</label><input required type="text" placeholder="e.g. Brake Pads" className="w-full border rounded p-2 mt-1" /></div>
              <div><label className="text-sm font-medium">Cost ($)</label><input required name="amount" type="number" step="0.01" className="w-full border rounded p-2 mt-1" /></div>
            </div>
            <button type="submit" className="w-full bg-amber-500 text-white py-2 rounded-lg font-semibold hover:bg-amber-600">Save Expense</button>
          </form>
        </div>
      )}
    </div>
  );
}