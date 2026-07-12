import { Bus, Clock, Wrench, CheckCircle2 } from "lucide-react";

const serviceTagStyles = {
  "Oil Change": "bg-violet-50 text-violet-700",
  "Brake Inspection": "bg-amber-50 text-amber-700",
  "Tyre Replacement": "bg-green-50 text-green-700",
};

export default function MaintenanceCard({ record, highlighted = false }) {
  const tagStyle = serviceTagStyles[record.serviceType] || "bg-slate-100 text-slate-600";

  return (
    <div
      className={`bg-white rounded-xl border p-4 ${
        highlighted ? "border-blue-500 ring-1 ring-blue-500" : "border-slate-200"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
            <Bus size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500">Vehicle</p>
            <p className="font-semibold text-slate-900">{record.vehicle}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${tagStyle}`}>
          {record.serviceType}
        </span>
      </div>

      <div className="space-y-1.5 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-500">Service Type</span>
          <span className="text-slate-800 font-medium">{record.serviceType}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Service Date</span>
          <span className="text-slate-800 font-medium">{record.serviceDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Estimated Cost</span>
          <span className="text-slate-800 font-medium">
            ${Number(record.estimatedCost).toFixed(2)}
          </span>
        </div>
      </div>

      {record.status === "in_shop" && record.subStatus === "in_progress" && (
        <div className="flex items-center gap-1.5 text-blue-600 text-sm font-medium mt-3 pt-3 border-t border-slate-100">
          <Clock size={15} />
          In Progress
        </div>
      )}
      {record.status === "in_shop" && record.subStatus === "technician_assigned" && (
        <div className="flex items-center gap-1.5 text-orange-600 text-sm font-medium mt-3 pt-3 border-t border-slate-100">
          <Wrench size={15} />
          Technician Assigned
        </div>
      )}
      {record.status === "completed" && (
        <div className="flex items-center gap-1.5 text-green-600 text-sm font-medium mt-3 pt-3 border-t border-slate-100">
          <CheckCircle2 size={15} />
          Completed on {record.completedDate}
        </div>
      )}
    </div>
  );
}