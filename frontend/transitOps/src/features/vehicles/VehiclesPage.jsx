import { useState, useMemo, useEffect } from "react";
import { Search, Filter, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import VehicleTable from "./VehicleTable";
import VehicleFormModal from "./VehicleFormModal";
import { api } from "../../lib/api";

const VEHICLE_TYPES = ["All Types", "Coach", "Minibus", "City Bus", "Box Truck"];
const STATUSES = ["All Statuses", "Available", "On Trip", "In Shop", "Retired"];
const REGIONS = ["All Regions", "North", "South", "East", "West"];

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All Types");
  const [status, setStatus] = useState("All Statuses");
  const [region, setRegion] = useState("All Regions");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const data = await api.get("/vehicles");
      const vehicleList = data.data?.vehicles || data.data || [];
      // Provide some fallback properties to match the UI if backend doesn't supply them
      const withDefaults = (Array.isArray(vehicleList) ? vehicleList : []).map(v => ({
        ...v,
        maxLoad: v.maxLoadCapacity ? `${v.maxLoadCapacity} kg` : "Unknown",
        odometer: v.odometer || "0 km",
        status: v.status || "Available"
      }));
      setVehicles(withDefaults);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddVehicle = async (formData) => {
    try {
      await api.post("/vehicles", {
        registrationNo: formData.regNo,
        name: formData.model,
        model: formData.model,
        type: formData.type === "Box Truck" ? "TRUCK" : (formData.type === "Minibus" ? "VAN" : "BUS"),
        region: formData.region || null,
        maxLoadCapacity: parseInt(formData.maxLoad),
        acquisitionCost: parseFloat(formData.cost),
        odometer: 0
      });
      
      setIsModalOpen(false);
      fetchVehicles(); // Refresh list
    } catch (err) {
      console.error(err);
      let errorMsg = err.message;
      if (err.details && err.details.errors) {
        errorMsg += "\n" + err.details.errors.map(e => `- ${e.field}: ${e.message}`).join("\n");
      }
      alert("Error adding vehicle: " + errorMsg);
    }
  };

  const filtered = useMemo(() => {
    return vehicles.filter((v) => {
      const vRegNo = v.regNo || v.registrationNumber || "";
      const vModel = v.model || v.name || "";
      const matchesSearch =
        vRegNo.toLowerCase().includes(search.toLowerCase()) ||
        vModel.toLowerCase().includes(search.toLowerCase());
      const matchesType = type === "All Types" || v.type === type;
      const matchesStatus = status === "All Statuses" || v.status === status;
      const matchesRegion = region === "All Regions" || v.region === region;
      return matchesSearch && matchesType && matchesStatus && matchesRegion;
    });
  }, [vehicles, search, type, status, region]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const clearFilters = () => {
    setSearch("");
    setType("All Types");
    setStatus("All Statuses");
    setRegion("All Regions");
    setPage(1);
  };

  return (
    <div>
      <VehicleFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleAddVehicle} 
      />
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Vehicles</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-lg transition"
        >
          <Plus size={18} />
          Add Vehicle
        </button>
      </div>

      {error && <div className="mb-4 text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">{error}</div>}

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-3 mb-6">
        <div className="relative flex-1 min-w-[220px]">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search vehicles..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
          />
        </div>

        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 bg-white"
        >
          {VEHICLE_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 bg-white"
        >
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <select
          value={region}
          onChange={(e) => {
            setRegion(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 bg-white"
        >
          {REGIONS.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>

        <button
          onClick={clearFilters}
          className="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition whitespace-nowrap"
        >
          <Filter size={16} />
          Clear Filters
        </button>
      </div>

      {/* Table card */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-slate-500">Loading vehicles...</div>
        ) : (
          <VehicleTable data={paginated} />
        )}
      </div>

      {/* Pagination */}
      {!loading && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
          <p className="text-sm text-slate-500">
            Showing {filtered.length === 0 ? 0 : (page - 1) * pageSize + 1} to{" "}
            {Math.min(page * pageSize, filtered.length)} of {filtered.length} vehicles
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 border border-slate-300 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium">
              {page}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 border border-slate-300 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}