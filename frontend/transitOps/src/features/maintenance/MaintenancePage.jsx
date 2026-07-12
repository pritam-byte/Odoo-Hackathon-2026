import { useState, useEffect } from "react";
import { Calendar, Wrench, CheckCircle2, Plus } from "lucide-react";
import MaintenanceCard from "./MaintenanceCard";
import AddMaintenanceModal from "./AddMaintenanceModal";

const TABS = [
  { key: "open", label: "Open Maintenance" },
  { key: "in_shop", label: "In Shop" },
  { key: "completed", label: "Completed" },
];

function formatDateForDisplay(dateStr) {
  if (!dateStr) return "Unknown Date";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function MaintenancePage() {
  const [records, setRecords] = useState([]);
  const [activeTab, setActiveTab] = useState("open");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5001/api/maintenance");
      if (!res.ok) throw new Error("Failed to fetch maintenance logs");
      const data = await res.json();
      
      const formatted = (Array.isArray(data.data) ? data.data : []).map(r => ({
        id: r.id,
        vehicle: r.vehicle ? (r.vehicle.registrationNo || r.vehicle.regNo) : "Unknown Vehicle",
        serviceType: r.serviceType,
        serviceDate: formatDateForDisplay(r.openedAt || r.createdAt),
        estimatedCost: r.cost || 0,
        status: r.status === "OPEN" ? "in_shop" : "completed", // Map DB status to UI status
        subStatus: r.status === "OPEN" ? "in_progress" : undefined,
        completedDate: r.closedAt ? formatDateForDisplay(r.closedAt) : undefined,
      }));
      setRecords(formatted);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inShop = records.filter((r) => r.status === "in_shop");
  const completed = records.filter((r) => r.status === "completed");

  const handleAddRecord = () => {
    setModalOpen(false);
    fetchLogs(); // Refresh the list from the database
  };

  const columnsToShow = () => {
    switch (activeTab) {
      case "in_shop":
        return [{ title: "In Shop", icon: <Wrench size={18} />, records: inShop }];
      case "completed":
        return [{ title: "Completed", icon: <CheckCircle2 size={18} className="text-green-600" />, records: completed }];
      case "open":
      default:
        return [
          { title: "In Shop", icon: <Wrench size={18} />, records: inShop },
          { title: "Completed", icon: <CheckCircle2 size={18} className="text-green-600" />, records: completed.slice(0, 5) }, // show recent
        ];
    }
  };

  const columns = columnsToShow();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Maintenance</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-lg transition"
        >
          <Plus size={18} />
          Add Maintenance
        </button>
      </div>

      {error && <div className="mb-4 text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">{error}</div>}

      <div className="flex gap-6 border-b border-slate-200 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-3 text-sm font-medium border-b-2 transition ${
              activeTab === tab.key
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={`grid grid-cols-1 gap-5 ${columns.length === 1 ? "md:grid-cols-1 max-w-md" : columns.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
        {loading ? (
           <div className="col-span-full py-16 text-center text-slate-500">Loading maintenance logs...</div>
        ) : (
          columns.map((col) => (
            <MaintenanceColumn key={col.title} title={col.title} icon={col.icon} count={col.records.length} records={col.records} />
          ))
        )}
      </div>

      {modalOpen && (
        <AddMaintenanceModal
          onClose={() => setModalOpen(false)}
          onSubmit={handleAddRecord}
        />
      )}
    </div>
  );
}

function MaintenanceColumn({ title, icon, count, records }) {
  return (
    <div className="bg-slate-50 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2 font-semibold text-slate-900">
          {icon}
          {title}
        </div>
        <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-600">
          {count}
        </span>
      </div>
      <div className="space-y-3">
        {records.length === 0 ? (
          <p className="text-sm text-slate-400 px-1">No records.</p>
        ) : (
          records.map((r) => (
            <MaintenanceCard key={r.id} record={r} highlighted={r.highlighted} />
          ))
        )}
      </div>
    </div>
  );
}