import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useFleet } from "../../context/FleetContext";

const statusStyles = {
  "In Progress": "bg-blue-50 text-blue-700",
  Completed: "bg-green-50 text-green-700",
  Scheduled: "bg-slate-100 text-slate-600",
};

export default function TripActivityTable() {
  const navigate = useNavigate();
  const { trips } = useFleet();
  const recentTrips = trips.slice(0, 8);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900">Trip Activity</h3>
        <button onClick={() => navigate("/trips")} className="text-sm font-medium text-blue-600 hover:text-blue-700">
          View All Trips
        </button>
      </div>

      {recentTrips.length === 0 ? (
        <p className="py-10 text-center text-slate-500 text-sm">No trips dispatched yet.</p>
      ) : (
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
              {recentTrips.map((t) => (
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
      )}

      <button onClick={() => navigate("/trips")} className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 mt-4">
        View all trips
        <ArrowRight size={15} />
      </button>
    </div>
  );
}