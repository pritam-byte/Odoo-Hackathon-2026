// src/features/trips/CreateTripPage.jsx
import { useState, useMemo, useEffect } from "react";
import { MapPin, Truck, User, Package, Route, Scale, Send } from "lucide-react";
import CapacityPanel from "./CapacityPanel";
import { parseCapacityKg } from "../vehicles/capacityUtils";

const MOCK_LOCATIONS = [
  "Warehouse A, 123 Industrial Rd, Metro City",
  "Distribution Center B, 456 Commerce St, Metro City",
  "Depot C, 789 Logistics Ave, Metro City",
];

export default function CreateTripPage() {
  const [availableVehicles, setAvailableVehicles] = useState([]);
  const [availableDrivers, setAvailableDrivers] = useState([]);

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [driverId, setDriverId] = useState("");
  const [cargoWeight, setCargoWeight] = useState("");
  const [distance, setDistance] = useState("");
  const [revenue, setRevenue] = useState("");
  
  const [stage, setStage] = useState("draft");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchAvailableResources();
  }, []);

  const fetchAvailableResources = async () => {
    try {
      const [vehRes, drvRes] = await Promise.all([
        fetch("http://localhost:5001/api/vehicles/available"),
        fetch("http://localhost:5001/api/drivers/available")
      ]);
      if (vehRes.ok) {
        const vehData = await vehRes.json();
        setAvailableVehicles(vehData.data || vehData || []);
      }
      if (drvRes.ok) {
        const drvData = await drvRes.json();
        setAvailableDrivers(drvData.data || drvData || []);
      }
    } catch (err) {
      console.error("Failed to fetch available resources", err);
    }
  };

  const selectedVehicle = useMemo(
    () => availableVehicles.find((v) => String(v.id) === String(vehicleId)),
    [availableVehicles, vehicleId]
  );
  
  // Use the database's maxLoadCapacity, or fallback to the UI parse if it's a string
  const maxCapacity = selectedVehicle 
    ? (selectedVehicle.maxLoadCapacity || parseCapacityKg(selectedVehicle.maxLoad)) 
    : 500;

  const handleCapacityCheck = () => {
    const weight = Number(cargoWeight) || 0;
    if (weight === 0) {
      setError("Enter a cargo weight first.");
      return;
    }
    if (weight > maxCapacity) {
      setError(`Cargo exceeds ${selectedVehicle?.regNo || selectedVehicle?.registrationNo || "vehicle"}'s ~${maxCapacity} kg capacity.`);
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
      const res = await fetch("http://localhost:5001/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source,
          destination,
          vehicleId,
          driverId,
          cargoWeight: parseFloat(cargoWeight),
          plannedDistance: parseFloat(distance),
          revenue: revenue ? parseFloat(revenue) : 0,
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to dispatch trip");
      }

      setStage("dispatched");
      // Remove the selected vehicle and driver from available lists locally
      setAvailableVehicles(prev => prev.filter(v => String(v.id) !== String(vehicleId)));
      setAvailableDrivers(prev => prev.filter(d => String(d.id) !== String(driverId)));
    } catch (err) {
      setError(err.message || "Failed to dispatch trip. Please try again.");
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
                    <option key={v.id} value={v.id}>{v.registrationNo || v.regNo} — {v.model}</option>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Estimated Revenue ($) (Optional)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                  className="w-full pl-9 pr-3 py-3 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
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
                disabled={submitting || stage === "dispatched"}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-semibold py-3 rounded-lg transition"
              >
                <Send size={18} />
                {submitting ? "Dispatching..." : stage === "dispatched" ? "Dispatched" : "Dispatch Trip"}
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