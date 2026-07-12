// must match your Prisma enums exactly — check schema.prisma
const TYPE_TO_ENUM = {
  Coach: "BUS",
  Minibus: "VAN",
  "City Bus": "BUS",
  "Box Truck": "TRUCK",
};

const ENUM_TO_TYPE_LABEL = {
  VAN: "Minibus",
  TRUCK: "Box Truck",
  BUS: "Coach",
  PICKUP: "Pickup",
  CAR: "Car",
  OTHER: "Other",
};

const STATUS_LABELS = {
  AVAILABLE: "Available",
  ON_TRIP: "On Trip",
  IN_SHOP: "In Shop",
  RETIRED: "Retired",
};

export function uiTypeToEnum(uiType) {
  return TYPE_TO_ENUM[uiType] || "OTHER";
}

export function apiVehicleToUiVehicle(apiVehicle) {
  return {
    id: apiVehicle.id,
    regNo: apiVehicle.registrationNo,
    model: apiVehicle.model,
    type: ENUM_TO_TYPE_LABEL[apiVehicle.type] || apiVehicle.type,
    // NOTE: original "53 Seats" style text isn't stored server-side —
    // only maxLoadCapacity (kg) comes back, so we display it as kg.
    maxLoad: `${apiVehicle.maxLoadCapacity} kg`,
    odometer: `${apiVehicle.odometer} km`,
    status: STATUS_LABELS[apiVehicle.status] || apiVehicle.status,
    region: apiVehicle.region,
  };
}