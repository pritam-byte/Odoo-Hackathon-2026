import { useState } from 'react';
import { X } from 'lucide-react';

export default function VehicleFormModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    regNo: '',
    model: '',
    type: 'Coach',
    region: '',
    maxLoad: '',
    cost: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">Register New Vehicle</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition p-1">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Registration Number</label>
              <input required name="regNo" value={formData.regNo} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition" placeholder="e.g. TRN-1234" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Name / Model</label>
              <input required name="model" value={formData.model} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition" placeholder="e.g. Volvo 9700" />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Type</label>
              <select name="type" value={formData.type} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition bg-white">
                <option value="Coach">Coach</option>
                <option value="Minibus">Minibus</option>
                <option value="City Bus">City Bus</option>
                <option value="Box Truck">Box Truck</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Region</label>
              <input required name="region" value={formData.region} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition" placeholder="e.g. North" />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Max Load Capacity (kg)</label>
              <input required type="number" name="maxLoad" value={formData.maxLoad} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition" placeholder="e.g. 5000" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Acquisition Cost ($)</label>
              <input required type="number" name="cost" value={formData.cost} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition" placeholder="e.g. 150000" />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 border border-slate-200 rounded-lg transition">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition">Register Vehicle</button>
          </div>
        </form>
      </div>
    </div>
  );
}
