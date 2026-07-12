import { createContext, useContext, useState } from "react";

const FleetContext = createContext(null);

const INITIAL_VEHICLES = [
  { id: 1, regNo: "TRN-9821", model: "Volvo 9700", type: "Coach", maxLoad: "53 Seats", odometer: "245,680 km", status: "Available", region: "North", fuelCost: 1820 },
  { id: 2, regNo: "TRN-7543", model: "Mercedes-Benz Sprinter", type: "Minibus", maxLoad: "19 Seats", odometer: "132,450 km", status: "On Trip", region: "South", fuelCost: 980 },
  { id: 3, regNo: "TRN-3317", model: "MAN Lion's City", type: "City Bus", maxLoad: "85 Passengers", odometer: "312,890 km", status: "Available", region: "East", fuelCost: 1650 },
  { id: 4, regNo: "TRN-6629", model: "DAF LF 250", type: "Box Truck", maxLoad: "7,500 kg", odometer: "198,765 km", status: "In Shop", region: "West", fuelCost: 690 },
  { id: 5, regNo: "TRN-1198", model: "Scania K280UB", type: "City Bus", maxLoad: "73 Passengers", odometer: "402,310 km", status: "On Trip", region: "North", fuelCost: 1420 },
  { id: 6, regNo: "TRN-5572", model: "Ford Transit", type: "Minibus", maxLoad: "16 Seats", odometer: "87,120 km", status: "Retired", region: "South", fuelCost: 0 },
];

const INITIAL_DRIVERS = [
  { id: 1, initials: "JD", name: "John Davis", license: "D1234567", category: "Class B", expiry: "2026-06-15", score: 92, status: "Available", color: "bg-blue-100 text-blue-700", warning: false },
  { id: 2, initials: "SM", name: "Sarah Martinez", license: "D2345678", category: "Class B", expiry: "2025-08-02", score: 88, status: "On Trip", color: "bg-purple-100 text-purple-700", warning: true },
  { id: 3, initials: "RW", name: "Robert Wilson", license: "D3456789", category: "Class A", expiry: "2025-06-05", score: 72, status: "Available", color: "bg-green-100 text-green-700", warning: true },
  { id: 4, initials: "JL", name: "Jessica Lee", license: "D4567890", category: "Class B", expiry: "2025-06-01", score: 68, status: "On Trip", color: "bg-amber-100 text-amber-700", warning: true },
  { id: 5, initials: "DM", name: "David Miller", license: "D5678901", category: "Class A", expiry: "2025-05-25", score: 54, status: "Suspended", color: "bg-red-100 text-red-700", warning: true },
  { id: 6, initials: "KW", name: "Karen White", license: "D6789012", category: "Class B", expiry: "2026-07-20", score: 90, status: "Available", color: "bg-teal-100 text-teal-700", warning: false },
];

// Seeded to match the two vehicles/drivers already marked "On Trip" above,
// so the dashboard isn't empty on first load. New trips get added on top via dispatchTrip().
const INITIAL_TRIPS = [
  { id: "TRP-1001", route: "Warehouse A → Distribution Center B", driver: "Sarah Martinez", vehicle: "TRN-7543", status: "In Progress", startTime: "8:05 AM" },
  { id: "TRP-1000", route: "Depot C → Warehouse A", driver: "Jessica Lee", vehicle: "TRN-1198", status: "In Progress", startTime: "7:45 AM" },
];

function shortLocation(fullAddress) {
  return fullAddress.split(",")[0] || fullAddress;
}

export function FleetProvider({ children }) {
  const [vehicles, setVehicles] = useState(INITIAL_VEHICLES);
  const [drivers, setDrivers] = useState(INITIAL_DRIVERS);
  const [trips, setTrips] = useState(INITIAL_TRIPS);

  const addVehicle = (vehicle) => {
    setVehicles((prev) => [{ fuelCost: 0, ...vehicle }, ...prev]);
  };

  const addDriver = (driver) => {
    setDrivers((prev) => [driver, ...prev]);
  };

  const updateVehicleStatus = (id, status) => {
    setVehicles((prev) => prev.map((v) => (v.id === id ? { ...v, status } : v)));
  };

  const updateDriverStatus = (id, status) => {
    setDrivers((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)));
  };

  // Called when a trip is dispatched from CreateTripPage.
  // Flips vehicle + driver to "On Trip" and records the trip so the dashboard can show it.
  const dispatchTrip = ({ source, destination, vehicleId, driverId }) => {
    const vehicle = vehicles.find((v) => v.id === Number(vehicleId));
    const driver = drivers.find((d) => d.id === Number(driverId));
    if (!vehicle || !driver) return null;

    const tripId = `TRP-${Math.floor(1000 + Math.random() * 9000)}`;
    const startTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const route = source && destination ? `${shortLocation(source)} → ${shortLocation(destination)}` : "Route TBD";

    const newTrip = {
      id: tripId,
      route,
      driver: driver.name,
      vehicle: vehicle.regNo,
      status: "In Progress",
      startTime,
    };

    setTrips((prev) => [newTrip, ...prev]);
    updateVehicleStatus(vehicle.id, "On Trip");
    updateDriverStatus(driver.id, "On Trip");
    return newTrip;
  };

  const value = {
    vehicles,
    drivers,
    trips,
    addVehicle,
    addDriver,
    updateVehicleStatus,
    updateDriverStatus,
    dispatchTrip,
  };

  return <FleetContext.Provider value={value}>{children}</FleetContext.Provider>;
}

export function useFleet() {
  const ctx = useContext(FleetContext);
  if (!ctx) throw new Error("useFleet must be used within a FleetProvider");
  return ctx;
}