const prisma = require("../../config/prisma");
const ApiError = require("../../utils/api-error");

const getTrip = async (id) => {
  const trip = await prisma.trip.findUnique({
    where: { id },

    include: {
      vehicle: true,
      driver: true,
      fuelLogs: true,
      expenses: true,
    },
  });

  if (!trip) {
    throw new ApiError(404, "Trip not found.");
  }

  return trip;
};

const createTrip = async (data) => {
  const [vehicle, driver] = await Promise.all([
    prisma.vehicle.findUnique({
      where: { id: data.vehicleId },
    }),

    prisma.driver.findUnique({
      where: { id: data.driverId },
    }),
  ]);

  if (!vehicle) {
    throw new ApiError(404, "Vehicle not found.");
  }

  if (!driver) {
    throw new ApiError(404, "Driver not found.");
  }

  if (data.cargoWeight > vehicle.maxLoadCapacity) {
    throw new ApiError(
      400,
      "Cargo weight exceeds vehicle maximum load capacity."
    );
  }

  return prisma.trip.create({
    data: {
      ...data,
      startOdometer: vehicle.odometer,
      status: "DRAFT",
    },

    include: {
      vehicle: true,
      driver: true,
    },
  });
};

const getTrips = async ({ status, vehicleId, driverId }) => {
  return prisma.trip.findMany({
    where: {
      ...(status && { status }),
      ...(vehicleId && { vehicleId }),
      ...(driverId && { driverId }),
    },

    include: {
      vehicle: true,
      driver: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

const dispatchTrip = async (tripId) => {
  return prisma.$transaction(async (tx) => {
    const trip = await tx.trip.findUnique({
      where: { id: tripId },

      include: {
        vehicle: true,
        driver: true,
      },
    });

    if (!trip) {
      throw new ApiError(404, "Trip not found.");
    }

    if (trip.status !== "DRAFT") {
      throw new ApiError(
        400,
        "Only draft trips can be dispatched."
      );
    }

    if (trip.vehicle.status !== "AVAILABLE") {
      throw new ApiError(400, "Vehicle is not available.");
    }

    if (trip.driver.status !== "AVAILABLE") {
      throw new ApiError(400, "Driver is not available.");
    }

    if (trip.driver.licenseExpiryDate <= new Date()) {
      throw new ApiError(400, "Driver license has expired.");
    }

    if (trip.cargoWeight > trip.vehicle.maxLoadCapacity) {
      throw new ApiError(
        400,
        "Cargo weight exceeds vehicle maximum load capacity."
      );
    }

    await tx.vehicle.update({
      where: {
        id: trip.vehicleId,
      },

      data: {
        status: "ON_TRIP",
      },
    });

    await tx.driver.update({
      where: {
        id: trip.driverId,
      },

      data: {
        status: "ON_TRIP",
      },
    });

    return tx.trip.update({
      where: {
        id: tripId,
      },

      data: {
        status: "DISPATCHED",
        dispatchedAt: new Date(),
      },

      include: {
        vehicle: true,
        driver: true,
      },
    });
  });
};

const completeTrip = async (tripId, data) => {
  return prisma.$transaction(async (tx) => {
    const trip = await tx.trip.findUnique({
      where: {
        id: tripId,
      },

      include: {
        vehicle: true,
      },
    });

    if (!trip) {
      throw new ApiError(404, "Trip not found.");
    }

    if (trip.status !== "DISPATCHED") {
      throw new ApiError(
        400,
        "Only dispatched trips can be completed."
      );
    }

    if (data.endOdometer < trip.vehicle.odometer) {
      throw new ApiError(
        400,
        "End odometer cannot be lower than the vehicle odometer."
      );
    }

    await tx.vehicle.update({
      where: {
        id: trip.vehicleId,
      },

      data: {
        status: "AVAILABLE",
        odometer: data.endOdometer,
      },
    });

    await tx.driver.update({
      where: {
        id: trip.driverId,
      },

      data: {
        status: "AVAILABLE",
      },
    });

    return tx.trip.update({
      where: {
        id: tripId,
      },

      data: {
        actualDistance: data.actualDistance,
        endOdometer: data.endOdometer,
        revenue: data.revenue,
        status: "COMPLETED",
        completedAt: new Date(),
      },

      include: {
        vehicle: true,
        driver: true,
      },
    });
  });
};

const cancelTrip = async (tripId) => {
  return prisma.$transaction(async (tx) => {
    const trip = await tx.trip.findUnique({
      where: {
        id: tripId,
      },
    });

    if (!trip) {
      throw new ApiError(404, "Trip not found.");
    }

    if (!["DRAFT", "DISPATCHED"].includes(trip.status)) {
      throw new ApiError(
        400,
        "Completed or cancelled trips cannot be cancelled."
      );
    }

    if (trip.status === "DISPATCHED") {
      await tx.vehicle.update({
        where: {
          id: trip.vehicleId,
        },

        data: {
          status: "AVAILABLE",
        },
      });

      await tx.driver.update({
        where: {
          id: trip.driverId,
        },

        data: {
          status: "AVAILABLE",
        },
      });
    }

    return tx.trip.update({
      where: {
        id: tripId,
      },

      data: {
        status: "CANCELLED",
      },

      include: {
        vehicle: true,
        driver: true,
      },
    });
  });
};

module.exports = {
  getTrip,
  createTrip,
  getTrips,
  dispatchTrip,
  completeTrip,
  cancelTrip,
};