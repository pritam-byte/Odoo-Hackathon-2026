import { useState } from "react";
import { X } from "lucide-react";

const CATEGORY_OPTIONS = ["Class A", "Class B", "Class C"];
const STATUS_OPTIONS = ["Available", "On Trip", "Suspended"];

const EMPTY_FORM = {
  name: "",
  license: "",
  category: "Class B",
  expiry: "",
  status: "Available",
};

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");
}

const COLOR_OPTIONS = [
  "bg-blue-100 text-blue-700",
  "bg-purple-100 text-purple-700",
  "bg-green-100 text-green-700",
  "bg-amber-100 text-amber-700",
  "bg-teal-100 text-teal-700",
];

export default function DriverModal({ open, onClose, onSave }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  if (!open) return null;

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.license.trim()) next.license = "License number is required";
    if (!form.expiry) next.expiry = "Expiry date is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const expiryDate = new Date(form.expiry);
    const warning = expiryDate < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000); // expiring within 90 days

    const newDriver = {
      id: Date.now(),
      initials: getInitials(form.name),
      name: form.name.trim(),
      license: form.license.trim(),
      category: form.category,
      expiry: form.expiry,
      score: 100,
      status: form.status,
      color: COLOR_OPTIONS[Math.floor(Math.random() * COLOR_OPTIONS.length)],
      warning,
    };

    onSave(newDriver);
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
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-slate-900">Add Driver</h2>
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
              Full Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={handleChange("name")}
              placeholder="e.g. John Davis"
              className={`w-full px-3 py-2.5 border rounded-lg text-sm outline-none focus:ring-1 transition ${
                errors.name
                  ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                  : "border-slate-300 focus:border-blue-600 focus:ring-blue-600"
              }`}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              License Number
            </label>
            <input
              type="text"
              value={form.license}
              onChange={handleChange("license")}
              placeholder="e.g. D1234567"
              className={`w-full px-3 py-2.5 border rounded-lg text-sm outline-none focus:ring-1 transition ${
                errors.license
                  ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                  : "border-slate-300 focus:border-blue-600 focus:ring-blue-600"
              }`}
            />
            {errors.license && (
              <p className="text-xs text-red-500 mt-1">{errors.license}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                License Category
              </label>
              <select
                value={form.category}
                onChange={handleChange("category")}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 bg-white"
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
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
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              License Expiry
            </label>
            <input
              type="date"
              value={form.expiry}
              onChange={handleChange("expiry")}
              className={`w-full px-3 py-2.5 border rounded-lg text-sm outline-none focus:ring-1 transition ${
                errors.expiry
                  ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                  : "border-slate-300 focus:border-blue-600 focus:ring-blue-600"
              }`}
            />
            {errors.expiry && (
              <p className="text-xs text-red-500 mt-1">{errors.expiry}</p>
            )}
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
              Add Driver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}