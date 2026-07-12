const { randomUUID } = require("crypto");

const store = require("../../data/memory.store");

const createVehicle = async (vehicleData) => {
  const existingVehicle = store.vehicles.find(
    (vehicle) => vehicle.registrationNo === vehicleData.registrationNo
  );

  if (existingVehicle) {
    const error = new Error(
      "A vehicle with this registration number already exists."
    );
    error.statusCode = 409;
    throw error;
  }

  const newVehicle = {
    id: randomUUID(),
    ...vehicleData,
    status: "AVAILABLE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  store.vehicles.push(newVehicle);

  return newVehicle;
};

const getVehicles = async ({ status, type, region, search }) => {
  let vehicles = [...store.vehicles];

  if (status) {
    vehicles = vehicles.filter((vehicle) => vehicle.status === status);
  }

  if (type) {
    vehicles = vehicles.filter((vehicle) => vehicle.type === type);
  }

  if (region) {
    vehicles = vehicles.filter(
      (vehicle) =>
        vehicle.region.toLowerCase() === region.toLowerCase()
    );
  }

  if (search) {
    const searchText = search.toLowerCase();

    vehicles = vehicles.filter((vehicle) => {
      return (
        vehicle.registrationNo.toLowerCase().includes(searchText) ||
        vehicle.name.toLowerCase().includes(searchText) ||
        vehicle.model.toLowerCase().includes(searchText)
      );
    });
  }

  return vehicles;
};

const getVehicleById = async (vehicleId) => {
  const vehicle = store.vehicles.find(
    (currentVehicle) => currentVehicle.id === vehicleId
  );

  if (!vehicle) {
    const error = new Error("Vehicle not found.");
    error.statusCode = 404;
    throw error;
  }

  return vehicle;
};

const updateVehicle = async (vehicleId, updateData) => {
  const vehicle = await getVehicleById(vehicleId);

  Object.assign(vehicle, updateData, {
    updatedAt: new Date().toISOString(),
  });

  return vehicle;
};

const deleteVehicle = async (vehicleId) => {
  const vehicle = await getVehicleById(vehicleId);

  if (vehicle.status === "ON_TRIP") {
    const error = new Error(
      "A vehicle currently on a trip cannot be deleted."
    );
    error.statusCode = 400;
    throw error;
  }

  const vehicleIndex = store.vehicles.findIndex(
    (currentVehicle) => currentVehicle.id === vehicleId
  );

  store.vehicles.splice(vehicleIndex, 1);

  return vehicle;
};

module.exports = {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
