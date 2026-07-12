import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// TODO: replace with real data from backend team's /trips?recent=true endpoint
const MOCK_TRIPS = [
  { id: "TRP-7421", route: "Downtown → Airport", driver: "James Carter", vehicle: "BUS-1042", status: "In Progress", startTime: "8:15 AM" },
  { id: "TRP-7420", route: "Airport → Midtown", driver: "Sarah Johnson", vehicle: "BUS-1031", status: "In Progress", startTime: "8:05 AM" },
  { id: "TRP-7419", route: "Midtown → Suburb", driver: "Michael Lee", vehicle: "VAN-2007", status: "Completed", startTime: "7:45 AM" },
  { id: "TRP-7418", route: "Suburb → Downtown", driver: "David Brown", vehicle: "BUS-1055", status: "Completed", startTime: "7:30 AM" },
  { id: "TRP-7417", route: "Downtown → Campus", driver: "Emily Davis", vehicle: "BUS-1028", status: "Scheduled", startTime: "9:00 AM" },
  { id: "TRP-7416", route: "Campus → Downtown", driver: "Robert Wilson", vehicle: "VAN-2012", status: "Scheduled", startTime: "9:15 AM" },
  { id: "TRP-7415", route: "Downtown → Mall", driver: "Lisa Anderson", vehicle: "BUS-1046", status: "Scheduled", startTime: "9:30 AM" },
  { id: "TRP-7414", route: "Mall → Downtown", driver: "Thomas Clark", vehicle: "BUS-1033", status: "Scheduled", startTime: "9:45 AM" },
];

const statusStyles = {
  "In Progress": "bg-blue-50 text-blue-700",
  Completed: "bg-green-50 text-green-700",
  Scheduled: "bg-slate-100 text-slate-600",
};

export default function TripActivityTable() {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900">Trip Activity</h3>
        <button onClick={() => navigate("/trips")} className="text-sm font-medium text-blue-600 hover:text-blue-700">
          View All Trips
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs text-slate-500 uppercase">
              <th className="py-2 pr-4 font-semibold">Trip ID</th>
              <th className="py-2 pr-4 font-semibold">Route</th>
              <th className="py-2 pr-4 font-semibold">Driver</th>
              <th className="py-2 pr-4 font-semibold">Vehicle</th>
              <th className="py-2 pr-4 font-semibold">Status</th>
              <th className="py-2 pr-4 font-semibold">Start Time</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_TRIPS.map((t) => (
              <tr key={t.id} className="border-t border-slate-100 hover:bg-slate-50 transition text-sm">
                <td className="py-3 pr-4 font-medium text-slate-900 whitespace-nowrap">{t.id}</td>
                <td className="py-3 pr-4 text-slate-700 whitespace-nowrap">{t.route}</td>
                <td className="py-3 pr-4 text-slate-700 whitespace-nowrap">{t.driver}</td>
                <td className="py-3 pr-4 text-slate-700 whitespace-nowrap">{t.vehicle}</td>
                <td className="py-3 pr-4 whitespace-nowrap">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[t.status]}`}>
                    {t.status}
                  </span>
                </td>
                <td className="py-3 pr-4 text-slate-700 whitespace-nowrap">{t.startTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={() => navigate("/trips")} className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 mt-4">
        View all trips
        <ArrowRight size={15} />
      </button>
    </div>
  );
}