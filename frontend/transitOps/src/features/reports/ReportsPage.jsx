// src/features/reports/ReportsPage.jsx
import { Download, Calendar, MapPin, RotateCcw, Bus, DollarSign, Droplet, Activity } from "lucide-react";
import ReportKPICard from "./ReportKPICard";
import ReportsTable from "./ReportsTable";

// Dummy Data
const MOCK_ROI_DATA = [
  { id: "V-1023", model: "NovaBus LFS", region: "North Region", rev: "$265,430", cost: "$134,560", roi: "19.71%", trend: "3.4%" },
  { id: "V-1007", model: "New Flyer XDE40", region: "Central Region", rev: "$230,980", cost: "$121,300", roi: "19.04%", trend: "2.7%" },
  { id: "V-1044", model: "NovaBus LFS", region: "East Region", rev: "$198,120", cost: "$110,250", roi: "17.96%", trend: "1.9%" },
  { id: "V-1018", model: "New Flyer XDE40", region: "West Region", rev: "$102,540", cost: "$102,140", roi: "17.29%", trend: "2.1%" },
  { id: "V-1032", model: "Proterra ZX5", region: "South Region", rev: "$154,320", cost: "$93,980", roi: "16.43%", trend: "1.6%" },
];

export default function ReportsPage() {
  return (
    <div className="p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Reports & Analytics</h1>
        <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-lg transition">
          <Download size={18} />
          Export CSV
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <select className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:border-blue-500 appearance-none">
            <option>May 1 – May 31, 2024</option>
          </select>
        </div>
        <div className="flex-1 relative">
          <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <select className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:border-blue-500 appearance-none">
            <option>All Regions</option>
          </select>
        </div>
        <button className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition whitespace-nowrap">
          <RotateCcw size={16} />
          Reset Filters
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <ReportKPICard title="Fleet Utilization" icon={Bus} value="78.4%" trend="↑ 6.2%" trendUp={true} period="Apr 1 - Apr 30" colorClass="bg-blue-100 text-blue-600" sparkline="0,30 20,25 40,35 60,15 80,20 100,5" />
        <ReportKPICard title="Vehicle ROI" icon={DollarSign} value="18.6%" trend="↑ 2.8%" trendUp={true} period="Apr 1 - Apr 30" colorClass="bg-green-100 text-green-600" sparkline="0,35 25,20 50,25 75,10 100,5" />
        <ReportKPICard title="Fuel Efficiency" icon={Droplet} value="6.32 MPG" trend="↑ 0.45" trendUp={true} period="Apr 1 - Apr 30" colorClass="bg-purple-100 text-purple-600" sparkline="0,20 20,30 40,15 60,25 80,10 100,5" />
        <ReportKPICard title="Operational Cost" icon={Activity} value="$1.24M" trend="↓ 4.3%" trendUp={false} period="Apr 1 - Apr 30" colorClass="bg-orange-100 text-orange-600" sparkline="0,5 25,15 50,10 75,30 100,25" />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        {/* Left Chart: Monthly Cost Trend */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-slate-900">Monthly Cost Trend</h3>
            <select className="border border-slate-200 rounded-lg text-xs px-2 py-1 text-slate-600 outline-none"><option>Total Cost (USD)</option></select>
          </div>
          <div className="relative h-64 w-full">
             <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="blueGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2"/>
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                {/* Grid lines */}
                <line x1="0" y1="0" x2="500" y2="0" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="50" x2="500" y2="50" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="100" x2="500" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="150" x2="500" y2="150" stroke="#f1f5f9" strokeWidth="1" />
                
                {/* Area & Line */}
                <polygon points="0,200 0,100 100,80 200,60 300,40 400,120 500,130 500,200" fill="url(#blueGradient)" />
                <polyline fill="none" stroke="#3b82f6" strokeWidth="3" points="0,100 100,80 200,60 300,40 400,120 500,130" />
                
                {/* Data Points */}
                <circle cx="0" cy="100" r="4" fill="white" stroke="#3b82f6" strokeWidth="2"/>
                <circle cx="100" cy="80" r="4" fill="white" stroke="#3b82f6" strokeWidth="2"/>
                <circle cx="200" cy="60" r="4" fill="white" stroke="#3b82f6" strokeWidth="2"/>
                <circle cx="300" cy="40" r="4" fill="white" stroke="#3b82f6" strokeWidth="2"/>
                <circle cx="400" cy="120" r="4" fill="white" stroke="#3b82f6" strokeWidth="2"/>
                <circle cx="500" cy="130" r="4" fill="white" stroke="#3b82f6" strokeWidth="2"/>
             </svg>
             <div className="absolute top-0 w-full h-full flex justify-between items-end pb-2 text-[10px] text-slate-400">
                <span>Dec '23</span><span>Jan '24</span><span>Feb '24</span><span>Mar '24</span><span>Apr '24</span><span>May '24</span>
             </div>
          </div>
        </div>

        {/* Right Chart: Top Performing Vehicles */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-slate-900">Top Performing Vehicles</h3>
            <select className="border border-slate-200 rounded-lg text-xs px-2 py-1 text-slate-600 outline-none"><option>Revenue (USD)</option></select>
          </div>
          <div className="flex items-end justify-between h-64 pb-6 relative">
            <div className="absolute left-0 h-full flex flex-col justify-between text-[10px] text-slate-400 pb-6">
              <span>$300K</span><span>$200K</span><span>$100K</span><span>$0</span>
            </div>
            
            {/* Bars */}
            <div className="flex flex-col items-center gap-2 ml-12">
              <span className="text-xs font-semibold text-slate-700">$265K</span>
              <div className="w-16 bg-blue-600 rounded-t-sm" style={{ height: "180px" }}></div>
              <span className="text-[10px] text-slate-500">V-1023</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-semibold text-slate-700">$231K</span>
              <div className="w-16 bg-blue-600 rounded-t-sm" style={{ height: "150px" }}></div>
              <span className="text-[10px] text-slate-500">V-1007</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-semibold text-slate-700">$198K</span>
              <div className="w-16 bg-blue-600 rounded-t-sm" style={{ height: "125px" }}></div>
              <span className="text-[10px] text-slate-500">V-1044</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-semibold text-slate-700">$176K</span>
              <div className="w-16 bg-blue-600 rounded-t-sm" style={{ height: "105px" }}></div>
              <span className="text-[10px] text-slate-500">V-1018</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-semibold text-slate-700">$154K</span>
              <div className="w-16 bg-blue-600 rounded-t-sm" style={{ height: "90px" }}></div>
              <span className="text-[10px] text-slate-500">V-1032</span>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <ReportsTable data={MOCK_ROI_DATA} />
    </div>
  );
}