const prisma = require("../../config/prisma");
const ApiError = require("../../utils/api-error");

const createVehicle = async (data) => {
  return prisma.vehicle.create({
    data,
  });
};

const getVehicles = async ({ status, type, region, search }) => {
  return prisma.vehicle.findMany({
    where: {
      ...(status && { status }),

      ...(type && { type }),

      ...(region && {
        region: {
          equals: region,
          mode: "insensitive",
        },
      }),

      ...(search && {
        OR: [
          {
            registrationNo: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            model: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      }),
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

const getVehicle = async (id) => {
  const vehicle = await prisma.vehicle.findUnique({
    where: { id },
  });

  if (!vehicle) {
    throw new ApiError(404, "Vehicle not found.");
  }

  return vehicle;
};

const updateVehicle = async (id, data) => {
  await getVehicle(id);

  return prisma.vehicle.update({
    where: { id },
    data,
  });
};

const deleteVehicle = async (id) => {
  const vehicle = await getVehicle(id);

  if (
    vehicle.status === "ON_TRIP" ||
    vehicle.status === "IN_SHOP"
  ) {
    throw new ApiError(
      400,
      "On-trip or in-shop vehicles cannot be deleted."
    );
  }

  return prisma.vehicle.delete({
    where: { id },
  });
};

module.exports = {
  createVehicle,
  getVehicles,
  getVehicle,
  updateVehicle,
  deleteVehicle,
};