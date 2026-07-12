import { useState, useMemo } from "react";
import { Search, Filter, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import VehicleTable from "./VehicleTable";
import VehicleModal from "./VehicleModal";

// TODO: replace with real API call to backend team's /vehicles endpoint
const INITIAL_VEHICLES = [
  { id: 1, regNo: "TRN-9821", model: "Volvo 9700", type: "Coach", maxLoad: "53 Seats", odometer: "245,680 km", status: "Available", region: "North" },
  { id: 2, regNo: "TRN-7543", model: "Mercedes-Benz Sprinter", type: "Minibus", maxLoad: "19 Seats", odometer: "132,450 km", status: "On Trip", region: "South" },
  { id: 3, regNo: "TRN-3317", model: "MAN Lion's City", type: "City Bus", maxLoad: "85 Passengers", odometer: "312,890 km", status: "Available", region: "East" },
  { id: 4, regNo: "TRN-6629", model: "DAF LF 250", type: "Box Truck", maxLoad: "7,500 kg", odometer: "198,765 km", status: "In Shop", region: "West" },
  { id: 5, regNo: "TRN-1198", model: "Scania K280UB", type: "City Bus", maxLoad: "73 Passengers", odometer: "402,310 km", status: "On Trip", region: "North" },
  { id: 6, regNo: "TRN-5572", model: "Ford Transit", type: "Minibus", maxLoad: "16 Seats", odometer: "87,120 km", status: "Retired", region: "South" },
];

const VEHICLE_TYPES = ["All Types", "Coach", "Minibus", "City Bus", "Box Truck"];
const STATUSES = ["All Statuses", "Available", "On Trip", "In Shop", "Retired"];
const REGIONS = ["All Regions", "North", "South", "East", "West"];

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState(INITIAL_VEHICLES);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All Types");
  const [status, setStatus] = useState("All Statuses");
  const [region, setRegion] = useState("All Regions");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    return vehicles.filter((v) => {
      const matchesSearch =
        v.regNo.toLowerCase().includes(search.toLowerCase()) ||
        v.model.toLowerCase().includes(search.toLowerCase());
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

  const handleAddVehicle = (newVehicle) => {
    setVehicles((prev) => [newVehicle, ...prev]);
    setModalOpen(false);
    setPage(1);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Vehicles</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-lg transition"
        >
          <Plus size={18} />
          Add Vehicle
        </button>
      </div>

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
        <VehicleTable data={paginated} />
      </div>

      {/* Pagination */}
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

      <VehicleModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleAddVehicle}
      />
    </div>
  );
}