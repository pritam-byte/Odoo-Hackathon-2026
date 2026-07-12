import { useState } from "react";
import { X } from "lucide-react";

const SERVICE_TYPES = ["Oil Change", "Brake Inspection", "Tyre Replacement", "Engine Check", "Battery Replacement"];
const STATUS_OPTIONS = [
  { value: "scheduled", label: "Scheduled" },
  { value: "in_shop", label: "In Shop" },
  { value: "completed", label: "Completed" },
];

function formatDateForDisplay(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function AddMaintenanceModal({ onClose, onSubmit }) {
  const [status, setStatus] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [serviceDate, setServiceDate] = useState("");
  const [estimatedCost, setEstimatedCost] = useState("");
  const [subStatus, setSubStatus] = useState("in_progress");
  const [completedDate, setCompletedDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!status) {
      setError("Please select a maintenance status first.");
      return;
    }
    if (!vehicle || !serviceType || !serviceDate || !estimatedCost) {
      setError("Please fill in all fields.");
      return;
    }
    if (status === "completed" && !completedDate) {
      setError("Please provide the completed date.");
      return;
    }

    const record = {
      vehicle,
      serviceType,
      serviceDate: formatDateForDisplay(serviceDate),
      estimatedCost: Number(estimatedCost),
      status,
    };

    if (status === "in_shop") {
      record.subStatus = subStatus;
    }
    if (status === "completed") {
      record.completedDate = formatDateForDisplay(completedDate);
    }

    onSubmit(record);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-900">Add Maintenance</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Maintenance Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 bg-white"
            >
              <option value="">Select status</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          {status && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Vehicle</label>
                <input
                  type="text"
                  placeholder="e.g. Bus 1003"
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Service Type</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 bg-white"
                >
                  <option value="">Select service type</option>
                  {SERVICE_TYPES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Service Date</label>
                <input
                  type="date"
                  value={serviceDate}
                  onChange={(e) => setServiceDate(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Estimated Cost ($)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={estimatedCost}
                  onChange={(e) => setEstimatedCost(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600"
                />
              </div>

              {status === "in_shop" && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">In-Shop Progress</label>
                  <select
                    value={subStatus}
                    onChange={(e) => setSubStatus(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 bg-white"
                  >
                    <option value="in_progress">In Progress</option>
                    <option value="technician_assigned">Technician Assigned</option>
                  </select>
                </div>
              )}

              {status === "completed" && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Completed Date</label>
                  <input
                    type="date"
                    value={completedDate}
                    onChange={(e) => setCompletedDate(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600"
                  />
                </div>
              )}
            </>
          )}

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold"
            >
              Add Maintenance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}