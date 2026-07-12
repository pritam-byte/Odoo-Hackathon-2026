import { useState } from 'react';
import { X } from 'lucide-react';

export default function DriverFormModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    license: '',
    category: 'Class B',
    expiry: '',
    contactNumber: ''
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
          <h2 className="text-xl font-bold text-slate-800">Add New Driver</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition p-1">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5 col-span-2 sm:col-span-1">
              <label className="text-sm font-medium text-slate-700">Full Name</label>
              <input required name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition" placeholder="e.g. John Doe" />
            </div>
            <div className="space-y-1.5 col-span-2 sm:col-span-1">
              <label className="text-sm font-medium text-slate-700">License Number</label>
              <input required name="license" value={formData.license} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition" placeholder="e.g. D1234567" />
            </div>
            
            <div className="space-y-1.5 col-span-2 sm:col-span-1">
              <label className="text-sm font-medium text-slate-700">License Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition bg-white">
                <option value="Class A">Class A</option>
                <option value="Class B">Class B</option>
                <option value="Class C">Class C</option>
              </select>
            </div>
            <div className="space-y-1.5 col-span-2 sm:col-span-1">
              <label className="text-sm font-medium text-slate-700">Expiry Date</label>
              <input required type="date" name="expiry" value={formData.expiry} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition" />
            </div>

            <div className="space-y-1.5 col-span-2">
              <label className="text-sm font-medium text-slate-700">Contact Number</label>
              <input required name="contactNumber" value={formData.contactNumber} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition" placeholder="e.g. (555) 123-4567" />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 border border-slate-200 rounded-lg transition">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition">Add Driver</button>
          </div>
        </form>
      </div>
    </div>
  );
}
