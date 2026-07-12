import { useState, useMemo, useEffect } from "react";
import { Search, Filter, Plus } from "lucide-react";
import DriverTable from "./DriverTable";
import DriverFormModal from "./DriverFormModal";
import { api } from "../../lib/api";

const STATUSES = ["Status", "Available", "On Trip", "Suspended"];
const CATEGORIES = ["License Category", "Class A", "Class B", "Class C"];

export default function DriversPage() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Status");
  const [category, setCategory] = useState("License Category");

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const data = await api.get("/drivers");
      const driverList = data.data?.drivers || data.data || [];
      
      // Map properties to fit the table UI (which uses some mock UI properties)
      const formatted = (Array.isArray(driverList) ? driverList : []).map(d => {
        const nameParts = (d.name || "Unknown").split(" ");
        const initials = nameParts.map(n => n[0]).join("").substring(0, 2).toUpperCase();
        
        return {
          ...d,
          initials,
          score: d.score || 100, // default if not provided
          color: d.color || "bg-blue-100 text-blue-700",
          status: d.status || "Available",
          warning: d.warning || false
        };
      });
      setDrivers(formatted);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDriver = async (formData) => {
    try {
      await api.post("/drivers", {
        name: formData.name,
        licenseNumber: formData.license,
        licenseCategory: formData.category,
        licenseExpiryDate: formData.expiry,
        contactNumber: formData.contactNumber,
        safetyScore: 100,
        userId: null
      });
      
      setIsModalOpen(false);
      fetchDrivers(); // Refresh list
    } catch (err) {
      console.error(err);
      let errorMsg = err.message;
      if (err.details && err.details.errors) {
        errorMsg += "\n" + err.details.errors.map(e => `- ${e.field}: ${e.message}`).join("\n");
      }
      alert("Error adding driver: " + errorMsg);
    }
  };

  const filtered = useMemo(() => {
    return drivers.filter((d) => {
      const dName = d.name || "";
      const dLicense = d.license || d.licenseNumber || "";
      const matchesSearch = dName.toLowerCase().includes(search.toLowerCase()) || dLicense.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === "Status" || d.status === status;
      const matchesCategory = category === "License Category" || d.category === category;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [drivers, search, status, category]);

  const clearFilters = () => {
    setSearch("");
    setStatus("Status");
    setCategory("License Category");
  };

  return (
    <div>
      <DriverFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleAddDriver} 
      />
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Drivers</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-lg transition"
        >
          <Plus size={18} />
          Add Driver
        </button>
      </div>

      {error && <div className="mb-4 text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">{error}</div>}

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
        {loading ? (
          <div className="py-16 text-center text-slate-500">Loading drivers...</div>
        ) : (
          <DriverTable data={filtered} />
        )}
      </div>
    </div>
  );
}