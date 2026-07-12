import { useState } from "react";
import { X } from "lucide-react";

const TYPE_OPTIONS = ["Coach", "Minibus", "City Bus", "Box Truck"];
const STATUS_OPTIONS = ["Available", "On Trip", "In Shop", "Retired"];
const REGION_OPTIONS = ["North", "South", "East", "West"];

const EMPTY_FORM = {
  regNo: "",
  model: "",
  type: "Coach",
  maxLoad: "",
  odometer: "",
  status: "Available",
  region: "North",
};

export default function VehicleModal({ open, onClose, onSave }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  if (!open) return null;

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.regNo.trim()) next.regNo = "Registration number is required";
    if (!form.model.trim()) next.model = "Vehicle model is required";
    if (!form.maxLoad.trim()) next.maxLoad = "Max load / capacity is required";
    if (!form.odometer.trim()) next.odometer = "Odometer reading is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newVehicle = {
      id: Date.now(),
      regNo: form.regNo.trim().toUpperCase(),
      model: form.model.trim(),
      type: form.type,
      maxLoad: form.maxLoad.trim(),
      odometer: form.odometer.trim(),
      status: form.status,
      region: form.region,
    };

    onSave(newVehicle);
    setForm(EMPTY_FORM);
    setErrors({});
  };

  const handleClose = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-slate-900">Add Vehicle</h2>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Registration No.
            </label>
            <input
              type="text"
              value={form.regNo}
              onChange={handleChange("regNo")}
              placeholder="e.g. TRN-1234"
              className={`w-full px-3 py-2.5 border rounded-lg text-sm outline-none focus:ring-1 transition ${
                errors.regNo
                  ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                  : "border-slate-300 focus:border-blue-600 focus:ring-blue-600"
              }`}
            />
            {errors.regNo && (
              <p className="text-xs text-red-500 mt-1">{errors.regNo}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Vehicle Model
            </label>
            <input
              type="text"
              value={form.model}
              onChange={handleChange("model")}
              placeholder="e.g. Volvo 9700"
              className={`w-full px-3 py-2.5 border rounded-lg text-sm outline-none focus:ring-1 transition ${
                errors.model
                  ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                  : "border-slate-300 focus:border-blue-600 focus:ring-blue-600"
              }`}
            />
            {errors.model && (
              <p className="text-xs text-red-500 mt-1">{errors.model}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Type
              </label>
              <select
                value={form.type}
                onChange={handleChange("type")}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 bg-white"
              >
                {TYPE_OPTIONS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Region
              </label>
              <select
                value={form.region}
                onChange={handleChange("region")}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 bg-white"
              >
                {REGION_OPTIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Max Load / Capacity
            </label>
            <input
              type="text"
              value={form.maxLoad}
              onChange={handleChange("maxLoad")}
              placeholder="e.g. 53 Seats or 7,500 kg"
              className={`w-full px-3 py-2.5 border rounded-lg text-sm outline-none focus:ring-1 transition ${
                errors.maxLoad
                  ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                  : "border-slate-300 focus:border-blue-600 focus:ring-blue-600"
              }`}
            />
            {errors.maxLoad && (
              <p className="text-xs text-red-500 mt-1">{errors.maxLoad}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Odometer
            </label>
            <input
              type="text"
              value={form.odometer}
              onChange={handleChange("odometer")}
              placeholder="e.g. 245,680 km"
              className={`w-full px-3 py-2.5 border rounded-lg text-sm outline-none focus:ring-1 transition ${
                errors.odometer
                  ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                  : "border-slate-300 focus:border-blue-600 focus:ring-blue-600"
              }`}
            />
            {errors.odometer && (
              <p className="text-xs text-red-500 mt-1">{errors.odometer}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Status
            </label>
            <select
              value={form.status}
              onChange={handleChange("status")}
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 bg-white"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm transition"
            >
              Add Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}