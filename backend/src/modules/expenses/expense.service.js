const prisma = require("../../config/prisma");
const ApiError = require("../../utils/api-error");

const createExpense = async (data) => {
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
        "Expense vehicle must match the trip vehicle."
      );
    }
  }

  return prisma.expense.create({
    data,

    include: {
      vehicle: true,
      trip: true,
    },
  });
};

const getExpenses = async ({
  vehicleId,
  tripId,
  category,
  from,
  to,
}) => {
  return prisma.expense.findMany({
    where: {
      ...(vehicleId && { vehicleId }),

      ...(tripId && { tripId }),

      ...(category && { category }),

      ...((from || to) && {
        expenseDate: {
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
      expenseDate: "desc",
    },
  });
};

module.exports = {
  createExpense,
  getExpenses,
};