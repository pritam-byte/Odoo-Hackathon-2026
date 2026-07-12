const prisma = require("../../config/prisma");
const ApiError = require("../../utils/api-error");

const getLog = async (id) => {
  const log = await prisma.maintenanceLog.findUnique({
    where: { id },
    include: { vehicle: true },
  });

  if (!log) {
    throw new ApiError(404, "Maintenance log not found.");
  }

  return log;
};

const openMaintenance = async (data) => {
  return prisma.$transaction(async (tx) => {
    const vehicle = await tx.vehicle.findUnique({
      where: {
        id: data.vehicleId,
      },
    });

    if (!vehicle) {
      throw new ApiError(404, "Vehicle not found.");
    }

    if (vehicle.status === "ON_TRIP") {
      throw new ApiError(
        400,
        "An on-trip vehicle cannot enter maintenance."
      );
    }

    if (vehicle.status === "RETIRED") {
      throw new ApiError(
        400,
        "A retired vehicle cannot enter maintenance."
      );
    }

    const maintenance = await tx.maintenanceLog.create({
      data,
      include: {
        vehicle: true,
      },
    });

    await tx.vehicle.update({
      where: {
        id: vehicle.id,
      },
      data: {
        status: "IN_SHOP",
      },
    });

    return maintenance;
  });
};

const getLogs = async ({ status, vehicleId }) => {
  return prisma.maintenanceLog.findMany({
    where: {
      ...(status && { status }),
      ...(vehicleId && { vehicleId }),
    },

    include: {
      vehicle: true,
    },

    orderBy: {
      openedAt: "desc",
    },
  });
};

const closeMaintenance = async (id) => {
  return prisma.$transaction(async (tx) => {
    const log = await tx.maintenanceLog.findUnique({
      where: { id },
      include: {
        vehicle: true,
      },
    });

    if (!log) {
      throw new ApiError(404, "Maintenance log not found.");
    }

    if (log.status !== "OPEN") {
      throw new ApiError(
        400,
        "Maintenance log is already closed."
      );
    }

    const updatedLog = await tx.maintenanceLog.update({
      where: { id },

      data: {
        status: "CLOSED",
        closedAt: new Date(),
      },

      include: {
        vehicle: true,
      },
    });

    if (log.vehicle.status !== "RETIRED") {
      await tx.vehicle.update({
        where: {
          id: log.vehicleId,
        },

        data: {
          status: "AVAILABLE",
        },
      });
    }

    return updatedLog;
  });
};

module.exports = {
  getLog,
  openMaintenance,
  getLogs,
  closeMaintenance,
};