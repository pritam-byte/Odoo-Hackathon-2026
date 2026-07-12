const prisma = require("../../config/prisma");

const getVehicleCosts = async () => {
  const vehicles = await prisma.vehicle.findMany({
    include: {
      trips: {
        where: {
          status: "COMPLETED",
        },

        select: {
          revenue: true,
          actualDistance: true,
        },
      },

      maintenanceLogs: {
        select: {
          cost: true,
        },
      },

      fuelLogs: {
        select: {
          cost: true,
          liters: true,
        },
      },

      expenses: {
        select: {
          amount: true,
        },
      },
    },

    orderBy: {
      name: "asc",
    },
  });

  return vehicles.map((vehicle) => {
    const sum = (items, key) => {
      return items.reduce((total, item) => {
        return total + (item[key] || 0);
      }, 0);
    };

    const revenue = sum(vehicle.trips, "revenue");

    const distance = sum(vehicle.trips, "actualDistance");

    const fuelCost = sum(vehicle.fuelLogs, "cost");

    const liters = sum(vehicle.fuelLogs, "liters");

    const maintenanceCost = sum(
      vehicle.maintenanceLogs,
      "cost"
    );

    const otherExpenseCost = sum(
      vehicle.expenses,
      "amount"
    );

    const operationalCost =
      fuelCost + maintenanceCost + otherExpenseCost;

    const fuelEfficiency = liters
      ? Number((distance / liters).toFixed(2))
      : 0;

    const roi = vehicle.acquisitionCost
      ? Number(
          (
            (revenue - (fuelCost + maintenanceCost)) /
            vehicle.acquisitionCost
          ).toFixed(4)
        )
      : 0;

    return {
      vehicleId: vehicle.id,
      registrationNo: vehicle.registrationNo,
      name: vehicle.name,
      model: vehicle.model,
      status: vehicle.status,
      revenue,
      fuelCost,
      maintenanceCost,
      otherExpenseCost,
      operationalCost,
      fuelEfficiency,
      roi,
    };
  });
};

const getFuelEfficiency = async () => {
  const [tripData, fuelData] = await Promise.all([
    prisma.trip.aggregate({
      where: {
        status: "COMPLETED",
      },

      _sum: {
        actualDistance: true,
      },
    }),

    prisma.fuelLog.aggregate({
      _sum: {
        liters: true,
        cost: true,
      },
    }),
  ]);

  const totalDistance = tripData._sum.actualDistance || 0;
  const totalLiters = fuelData._sum.liters || 0;
  const totalFuelCost = fuelData._sum.cost || 0;

  return {
    totalDistance,
    totalLiters,
    totalFuelCost,

    fuelEfficiency: totalLiters
      ? Number(
          (totalDistance / totalLiters).toFixed(2)
        )
      : 0,
  };
};

module.exports = {
  getVehicleCosts,
  getFuelEfficiency,
};