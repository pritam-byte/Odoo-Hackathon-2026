import { useState } from "react";
import { Calendar, Wrench, CheckCircle2, ClipboardCheck } from "lucide-react";
import MaintenanceCard from "./MaintenanceCard";

// TODO: replace with real data from backend team's /maintenance endpoint
const MOCK_RECORDS = [
  { id: 1, vehicle: "Bus 1024", serviceType: "Oil Change", openedDate: "May 20, 2025", estimatedCost: 280.0, status: "scheduled", column: "scheduled" },
  { id: 2, vehicle: "Bus 1056", serviceType: "Brake Inspection", openedDate: "May 21, 2025", estimatedCost: 450.0, status: "scheduled", column: "scheduled" },
  { id: 3, vehicle: "Bus 1078", serviceType: "Tyre Replacement", openedDate: "May 23, 2025", estimatedCost: 1200.0, status: "scheduled", column: "scheduled" },

  { id: 4, vehicle: "Bus 1003", serviceType: "Oil Change", openedDate: "May 19, 2025", estimatedCost: 280.0, status: "in_progress", column: "in_shop", highlighted: true },
  { id: 5, vehicle: "Bus 1041", serviceType: "Brake Inspection", openedDate: "May 18, 2025", estimatedCost: 450.0, status: "technician_assigned", column: "in_shop" },

  { id: 6, vehicle: "Bus 0995", serviceType: "Oil Change", openedDate: "May 15, 2025", estimatedCost: 280.0, status: "completed", completedDate: "May 16, 2025", column: "completed" },
  { id: 7, vehicle: "Bus 0971", serviceType: "Brake Inspection", openedDate: "May 12, 2025", estimatedCost: 450.0, status: "completed", completedDate: "May 13, 2025", column: "completed" },
  { id: 8, vehicle: "Bus 0988", serviceType: "Tyre Replacement", openedDate: "May 10, 2025", estimatedCost: 1200.0, status: "completed", completedDate: "May 11, 2025", column: "completed" },
];

const TABS = ["Open Maintenance", "In Shop", "Scheduled", "Completed"];

export default function MaintenancePage() {
  const [activeTab, setActiveTab] = useState("Open Maintenance");

  const scheduled = MOCK_RECORDS.filter((r) => r.column === "scheduled");
  const inShop = MOCK_RECORDS.filter((r) => r.column === "in_shop");
  const completed = MOCK_RECORDS.filter((r) => r.column === "completed");

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Maintenance</h1>
        <button
          onClick={() => {
            // TODO: open Close Maintenance modal/form
          }}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-lg transition"
        >
          <ClipboardCheck size={18} />
          Close Maintenance
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-slate-200 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium border-b-2 transition ${
              activeTab === tab
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <MaintenanceColumn
          title="Scheduled"
          icon={<Calendar size={18} />}
          count={scheduled.length}
          records={scheduled}
        />
        <MaintenanceColumn
          title="In Shop"
          icon={<Wrench size={18} />}
          count={inShop.length}
          records={inShop}
        />
        <MaintenanceColumn
          title="Completed"
          icon={<CheckCircle2 size={18} className="text-green-600" />}
          count={completed.length}
          records={completed}
        />
      </div>
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