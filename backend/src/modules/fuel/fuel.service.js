const prisma = require("../../config/prisma");
const ApiError = require("../../utils/api-error");

const createFuel = async (data) => {
  const vehicle = await prisma.vehicle.findUnique({
    where: {
      id: data.vehicleId,
    },
  });

  if (!vehicle) {
    throw new ApiError(404, "Vehicle not found.");
  }

  if (data.tripId) {
    const trip = await prisma.trip.findUnique({
      where: {
        id: data.tripId,
      },
    });

    if (!trip) {
      throw new ApiError(404, "Trip not found.");
    }

    if (trip.vehicleId !== data.vehicleId) {
      throw new ApiError(
        400,
        "Fuel log vehicle must match the trip vehicle."
      );
    }
  }

  return prisma.fuelLog.create({
    data,

    include: {
      vehicle: true,
      trip: true,
    },
  });
};

const getFuelLogs = async ({
  vehicleId,
  tripId,
  from,
  to,
}) => {
  return prisma.fuelLog.findMany({
    where: {
      ...(vehicleId && { vehicleId }),

      ...(tripId && { tripId }),

      ...((from || to) && {
        fuelDate: {
          ...(from && { gte: new Date(from) }),
          ...(to && { lte: new Date(to) }),
        },
      }),
    },

    include: {
      vehicle: true,
      trip: true,
    },

    orderBy: {
      fuelDate: "desc",
    },
  });
};

module.exports = {
  createFuel,
  getFuelLogs,
};