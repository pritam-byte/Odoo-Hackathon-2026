// src/features/drivers/DriversPage.jsx
import { useState, useMemo } from "react";
import { Search, Filter, Plus } from "lucide-react";
import DriverTable from "./DriverTable";

// Mock data matching the screenshot
const MOCK_DRIVERS = [
  { id: 1, initials: "JD", name: "John Davis", license: "D1234567", category: "Class B", expiry: "2026-06-15", score: 92, status: "Available", color: "bg-blue-100 text-blue-700", warning: false },
  { id: 2, initials: "SM", name: "Sarah Martinez", license: "D2345678", category: "Class B", expiry: "2025-08-02", score: 88, status: "On Trip", color: "bg-purple-100 text-purple-700", warning: true },
  { id: 3, initials: "RW", name: "Robert Wilson", license: "D3456789", category: "Class A", expiry: "2025-06-05", score: 72, status: "Available", color: "bg-green-100 text-green-700", warning: true },
  { id: 4, initials: "JL", name: "Jessica Lee", license: "D4567890", category: "Class B", expiry: "2025-06-01", score: 68, status: "On Trip", color: "bg-amber-100 text-amber-700", warning: true },
  { id: 5, initials: "DM", name: "David Miller", license: "D5678901", category: "Class A", expiry: "2025-05-25", score: 54, status: "Suspended", color: "bg-red-100 text-red-700", warning: true },
  { id: 6, initials: "KW", name: "Karen White", license: "D6789012", category: "Class B", expiry: "2026-07-20", score: 90, status: "Available", color: "bg-teal-100 text-teal-700", warning: false },
];

const STATUSES = ["Status", "Available", "On Trip", "Suspended"];
const CATEGORIES = ["License Category", "Class A", "Class B", "Class C"];

export default function DriversPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Status");
  const [category, setCategory] = useState("License Category");

  const filtered = useMemo(() => {
    return MOCK_DRIVERS.filter((d) => {
      const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.license.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === "Status" || d.status === status;
      const matchesCategory = category === "License Category" || d.category === category;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [search, status, category]);

  const clearFilters = () => {
    setSearch("");
    setStatus("Status");
    setCategory("License Category");
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Drivers</h1>
        <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-lg transition">
          <Plus size={18} />
          Add Driver
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col lg:flex-row gap-3 mb-6">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search drivers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
          />
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 bg-white"
        >
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 bg-white"
        >
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <select className="px-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 bg-white text-slate-500">
             <option>License Expiry</option>
        </select>

        <button
          onClick={clearFilters}
          className="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition whitespace-nowrap"
        >
          <Filter size={16} />
          Reset Filters
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <DriverTable data={filtered} />
      </div>
    </div>
  );
}