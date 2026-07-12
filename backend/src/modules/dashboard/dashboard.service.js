const prisma = require("../../config/prisma");

const getDashboard = async ({ region, type }) => {
  const vehicleFilter = {
    ...(region && {
      region: {
        equals: region,
        mode: "insensitive",
      },
    }),

    ...(type && { type }),
  };

  const [
    totalVehicles,
    activeVehicles,
    availableVehicles,
    vehiclesInMaintenance,
    retiredVehicles,
    activeTrips,
    pendingTrips,
    driversOnDuty,
    recentTrips,
  ] = await Promise.all([
    prisma.vehicle.count({
      where: vehicleFilter,
    }),

    prisma.vehicle.count({
      where: {
        ...vehicleFilter,
        status: "ON_TRIP",
      },
    }),

    prisma.vehicle.count({
      where: {
        ...vehicleFilter,
        status: "AVAILABLE",
      },
    }),

    prisma.vehicle.count({
      where: {
        ...vehicleFilter,
        status: "IN_SHOP",
      },
    }),

    prisma.vehicle.count({
      where: {
        ...vehicleFilter,
        status: "RETIRED",
      },
    }),

    prisma.trip.count({
      where: {
        status: "DISPATCHED",
      },
    }),

    prisma.trip.count({
      where: {
        status: "DRAFT",
      },
    }),

    prisma.driver.count({
      where: {
        status: "ON_TRIP",
      },
    }),

    prisma.trip.findMany({
      include: {
        vehicle: true,
        driver: true,
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 8,
    }),
  ]);

  const usableVehicles = totalVehicles - retiredVehicles;

  const fleetUtilization = usableVehicles
    ? Number(
        ((activeVehicles / usableVehicles) * 100).toFixed(2)
      )
    : 0;

  return {
    activeVehicles,
    availableVehicles,
    vehiclesInMaintenance,
    activeTrips,
    pendingTrips,
    driversOnDuty,
    fleetUtilization,
    recentTrips,
  };
};

module.exports = {
  getDashboard,
};