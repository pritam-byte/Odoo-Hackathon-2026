const prisma = require("../../config/prisma");
const ApiError = require("../../utils/api-error");

const getDriver = async (id) => {
  const driver = await prisma.driver.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });

  if (!driver) {
    throw new ApiError(404, "Driver not found.");
  }

  return driver;
};

const createDriver = async (data) => {
  return prisma.driver.create({
    data,
    include: {
      user: true,
    },
  });
};

const getDrivers = async ({
  status,
  licenseExpired,
  search,
}) => {
  return prisma.driver.findMany({
    where: {
      ...(status && { status }),

      ...(licenseExpired === "true" && {
        licenseExpiryDate: {
          lt: new Date(),
        },
      }),

      ...(search && {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            licenseNumber: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      }),
    },

    include: {
      user: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

const updateDriver = async (id, data) => {
  await getDriver(id);

  return prisma.driver.update({
    where: { id },
    data,
    include: {
      user: true,
    },
  });
};

const deleteDriver = async (id) => {
  const driver = await getDriver(id);

  if (driver.status === "ON_TRIP") {
    throw new ApiError(
      400,
      "A driver currently on a trip cannot be deleted."
    );
  }

  return prisma.driver.delete({
    where: { id },
  });
};

const availableDrivers = async () => {
  return prisma.driver.findMany({
    where: {
      status: "AVAILABLE",

      licenseExpiryDate: {
        gt: new Date(),
      },
    },

    orderBy: {
      name: "asc",
    },
  });
};

module.exports = {
  getDriver,
  createDriver,
  getDrivers,
  updateDriver,
  deleteDriver,
  availableDrivers,
};