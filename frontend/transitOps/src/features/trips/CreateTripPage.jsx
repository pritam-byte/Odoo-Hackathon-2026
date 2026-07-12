// src/features/trips/CreateTripPage.jsx
import { useState, useMemo } from "react";
import { MapPin, Truck, User, Package, Route, Scale, Send } from "lucide-react";
import CapacityPanel from "./CapacityPanel";
import { useFleet } from "../../context/FleetContext";
import { parseCapacityKg } from "../vehicles/capacityUtils";

const MOCK_LOCATIONS = [
  "Warehouse A, 123 Industrial Rd, Metro City",
  "Distribution Center B, 456 Commerce St, Metro City",
  "Depot C, 789 Logistics Ave, Metro City",
];

export default function CreateTripPage() {
  const { vehicles, drivers, dispatchTrip } = useFleet();

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [driverId, setDriverId] = useState("");
  const [cargoWeight, setCargoWeight] = useState("");
  const [distance, setDistance] = useState("");
  const [stage, setStage] = useState("draft");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const availableVehicles = useMemo(
    () => vehicles.filter((v) => v.status === "Available"),
    [vehicles]
  );
  const availableDrivers = useMemo(
    () => drivers.filter((d) => d.status === "Available"),
    [drivers]
  );

  const selectedVehicle = useMemo(
    () => vehicles.find((v) => String(v.id) === String(vehicleId)),
    [vehicles, vehicleId]
  );
  const maxCapacity = selectedVehicle ? parseCapacityKg(selectedVehicle.maxLoad) : 500;

  const handleCapacityCheck = () => {
    const weight = Number(cargoWeight) || 0;
    if (weight === 0) {
      setError("Enter a cargo weight first.");
      return;
    }
    if (weight > maxCapacity) {
      setError(`Cargo exceeds ${selectedVehicle?.regNo || "vehicle"}'s ~${maxCapacity} kg capacity.`);
    } else {
      setError("");
    }
  };

  const handleDispatch = async (e) => {
    e.preventDefault();
    setError("");

    if (!source || !destination || !vehicleId || !driverId || !cargoWeight || !distance) {
      setError("Please fill in all fields before dispatching.");
      return;
    }
    if (Number(cargoWeight) > maxCapacity) {
      setError("Cannot dispatch: cargo weight exceeds vehicle capacity.");
      return;
    }

    setSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 700));
      dispatchTrip({ source, destination, vehicleId, driverId });
      setStage("dispatched");
    } catch {
      setError("Failed to dispatch trip. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Create Trip</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-6 rounded-md bg-blue-50 text-blue-700 text-sm font-medium">
            📄 {stage === "draft" ? "Draft" : stage === "dispatched" ? "Dispatched" : "Completed"}
          </span>

          <form onSubmit={handleDispatch} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Source</label>
              <div className="relative">
                <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white appearance-none"
                >
                  <option value="">Select source location</option>
                  {MOCK_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Destination</label>
              <div className="relative">
                <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white appearance-none"
                >
                  <option value="">Select destination</option>
                  {MOCK_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Available Vehicle</label>
              <div className="relative">
                <Truck size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <select
                  value={vehicleId}
                  onChange={(e) => setVehicleId(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white appearance-none"
                >
                  <option value="">
                    {availableVehicles.length === 0 ? "No vehicles available" : "Select a vehicle"}
                  </option>
                  {availableVehicles.map((v) => (
                    <option key={v.id} value={v.id}>{v.regNo} — {v.model}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Available Driver</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <select
                  value={driverId}
                  onChange={(e) => setDriverId(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white appearance-none"
                >
                  <option value="">
                    {availableDrivers.length === 0 ? "No drivers available" : "Select a driver"}
                  </option>
                  {availableDrivers.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Cargo Weight (kg)</label>
              <div className="relative">
                <Package size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={cargoWeight}
                  onChange={(e) => setCargoWeight(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">kg</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Planned Distance (km)</label>
              <div className="relative">
                <Route size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="0"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">km</span>
              </div>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handleCapacityCheck}
                className="flex-1 inline-flex items-center justify-center gap-2 border border-blue-600 text-blue-600 font-semibold py-3 rounded-lg hover:bg-blue-50 transition"
              >
                <Scale size={18} />
                Capacity Check
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-semibold py-3 rounded-lg transition"
              >
                <Send size={18} />
                {submitting ? "Dispatching..." : "Dispatch Trip"}
              </button>
            </div>
          </form>
        </div>

        <div>
          <CapacityPanel cargoWeight={cargoWeight} maxCapacity={maxCapacity} stage={stage} />
        </div>
      </div>
    </div>
  );
}