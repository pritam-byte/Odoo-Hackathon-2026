import { useState } from "react";
import { X } from "lucide-react";

export default function VehicleForm({ onClose, onVehicleAdded }) {
  const [formData, setFormData] = useState({
    registrationNo: "",
    name: "",
    model: "",
    type: "Coach",
    maxLoadCapacity: "",
    odometer: "",
    acquisitionCost: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Convert string inputs to correct types
    const payload = {
      ...formData,
      maxLoadCapacity: Number(formData.maxLoadCapacity),
      odometer: Number(formData.odometer),
      acquisitionCost: Number(formData.acquisitionCost),
    };

    try {
      const response = await fetch("http://localhost:5001/api/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create vehicle");
      }

      const newVehicle = await response.json();
      onVehicleAdded(newVehicle.data);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-xl font-semibold text-slate-900">Register Vehicle</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1">
          {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Registration Number</label>
              <input
                required
                type="text"
                placeholder="e.g. TRN-1234"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                value={formData.registrationNo}
                onChange={(e) => setFormData({ ...formData, registrationNo: e.target.value })}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. City Cruiser"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Model</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Volvo 9700"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Type</label>
              <select
                className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="Coach">Coach</option>
                <option value="Minibus">Minibus</option>
                <option value="City Bus">City Bus</option>
                <option value="Box Truck">Box Truck</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Max Load (kg)</label>
                <input
                  required
                  type="number"
                  min="0"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  value={formData.maxLoadCapacity}
                  onChange={(e) => setFormData({ ...formData, maxLoadCapacity: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Odometer</label>
                <input
                  required
                  type="number"
                  min="0"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  value={formData.odometer}
                  onChange={(e) => setFormData({ ...formData, odometer: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Cost ($)</label>
                <input
                  required
                  type="number"
                  min="0"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  value={formData.acquisitionCost}
                  onChange={(e) => setFormData({ ...formData, acquisitionCost: e.target.value })}
                />
              </div>
            </div>
          </div>
        </form>

        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register Vehicle"}
          </button>
        </div>
      </div>
    </div>
  );
}
