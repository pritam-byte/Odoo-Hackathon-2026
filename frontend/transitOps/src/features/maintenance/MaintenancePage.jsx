import { useState } from "react";
import { Calendar, Wrench, CheckCircle2, Plus } from "lucide-react";
import MaintenanceCard from "./MaintenanceCard";
import AddMaintenanceModal from "./AddMaintenanceModal";

const INITIAL_RECORDS = [
  { id: 1, vehicle: "Bus 1024", serviceType: "Oil Change", serviceDate: "May 20, 2025", estimatedCost: 280.0, status: "scheduled" },
  { id: 2, vehicle: "Bus 1056", serviceType: "Brake Inspection", serviceDate: "May 21, 2025", estimatedCost: 450.0, status: "scheduled" },
  { id: 3, vehicle: "Bus 1078", serviceType: "Tyre Replacement", serviceDate: "May 23, 2025", estimatedCost: 1200.0, status: "scheduled" },

  { id: 4, vehicle: "Bus 1003", serviceType: "Oil Change", serviceDate: "May 19, 2025", estimatedCost: 280.0, status: "in_shop", subStatus: "in_progress", highlighted: true },
  { id: 5, vehicle: "Bus 1041", serviceType: "Brake Inspection", serviceDate: "May 18, 2025", estimatedCost: 450.0, status: "in_shop", subStatus: "technician_assigned" },

  { id: 6, vehicle: "Bus 0995", serviceType: "Oil Change", serviceDate: "May 15, 2025", estimatedCost: 280.0, status: "completed", completedDate: "May 16, 2025" },
  { id: 7, vehicle: "Bus 0971", serviceType: "Brake Inspection", serviceDate: "May 12, 2025", estimatedCost: 450.0, status: "completed", completedDate: "May 13, 2025" },
  { id: 8, vehicle: "Bus 0988", serviceType: "Tyre Replacement", serviceDate: "May 10, 2025", estimatedCost: 1200.0, status: "completed", completedDate: "May 11, 2025" },
];

const TABS = [
  { key: "open", label: "Open Maintenance" },
  { key: "in_shop", label: "In Shop" },
  { key: "scheduled", label: "Scheduled" },
  { key: "completed", label: "Completed" },
];

export default function MaintenancePage() {
  const [records, setRecords] = useState(INITIAL_RECORDS);
  const [activeTab, setActiveTab] = useState("open");
  const [modalOpen, setModalOpen] = useState(false);

  const scheduled = records.filter((r) => r.status === "scheduled");
  const inShop = records.filter((r) => r.status === "in_shop");
  const completed = records.filter((r) => r.status === "completed");

  const handleAddRecord = (newRecord) => {
    setRecords((prev) => [...prev, { ...newRecord, id: Date.now() }]);
    setModalOpen(false);
  };

  const columnsToShow = () => {
    switch (activeTab) {
      case "in_shop":
        return [{ title: "In Shop", icon: <Wrench size={18} />, records: inShop }];
      case "scheduled":
        return [{ title: "Scheduled", icon: <Calendar size={18} />, records: scheduled }];
      case "completed":
        return [{ title: "Completed", icon: <CheckCircle2 size={18} className="text-green-600" />, records: completed }];
      case "open":
      default:
        return [
          { title: "Scheduled", icon: <Calendar size={18} />, records: scheduled },
          { title: "In Shop", icon: <Wrench size={18} />, records: inShop },
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
        {columns.map((col) => (
          <MaintenanceColumn key={col.title} title={col.title} icon={col.icon} count={col.records.length} records={col.records} />
        ))}
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