import { useState, useEffect } from "react";
import { X, Truck } from "lucide-react";

const SERVICE_TYPES = ["Oil Change", "Brake Inspection", "Tyre Replacement", "Engine Check", "Battery Replacement"];

export default function AddMaintenanceModal({ onClose, onSubmit }) {
  const [availableVehicles, setAvailableVehicles] = useState([]);
  
  const [vehicleId, setVehicleId] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [description, setDescription] = useState("");
  
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/vehicles/available");
        if (res.ok) {
          const data = await res.json();
          setAvailableVehicles(data.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch available vehicles", err);
      }
    };
    fetchVehicles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!vehicleId || !serviceType) {
      setError("Please select a vehicle and service type.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("http://localhost:5001/api/maintenance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicleId,
          serviceType,
          description,
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to create maintenance log");
      }

      onSubmit(data.data); // Refresh the parent
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
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
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Available Vehicle</label>
            <div className="relative">
              <Truck size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                value={vehicleId}
                onChange={(e) => setVehicleId(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 bg-white appearance-none"
              >
                <option value="">Select a vehicle to service</option>
                {availableVehicles.map((v) => (
                  <option key={v.id} value={v.id}>{v.registrationNo || v.regNo} — {v.model}</option>
                ))}
              </select>
            </div>
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
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Description / Notes</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Any specific issues reported?"
              rows={3}
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600"
            />
          </div>

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
              disabled={submitting}
              className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white rounded-lg text-sm font-semibold transition"
            >
              {submitting ? "Adding..." : "Add to In Shop"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}