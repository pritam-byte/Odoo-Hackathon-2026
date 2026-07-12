/*
  DATABASE HANDOFF FILE

  Replace only the values marked with:
  REPLACE_WITH_TEAMMATE_VALUE

  Your database teammate must tell you:
  1. Prisma model delegate names
  2. Actual field names
  3. Enum/status values
*/

const dbMap = {
  models: {
    /*
      This is NOT necessarily the PostgreSQL table name.

      Example:
      Prisma model: User
      Prisma client delegate: prisma.user
      Therefore value becomes: "user"
    */
    user: "REPLACE_WITH_TEAMMATE_USER_MODEL_DELEGATE",

    vehicle: "REPLACE_WITH_TEAMMATE_VEHICLE_MODEL_DELEGATE",

    driver: "REPLACE_WITH_TEAMMATE_DRIVER_MODEL_DELEGATE",

    trip: "REPLACE_WITH_TEAMMATE_TRIP_MODEL_DELEGATE",

    maintenance: "REPLACE_WITH_TEAMMATE_MAINTENANCE_MODEL_DELEGATE",

    fuelLog: "REPLACE_WITH_TEAMMATE_FUEL_LOG_MODEL_DELEGATE",

    expense: "REPLACE_WITH_TEAMMATE_EXPENSE_MODEL_DELEGATE",
  },

  fields: {
    user: {
      id: "REPLACE_WITH_USER_ID_FIELD",
      name: "REPLACE_WITH_USER_NAME_FIELD",
      email: "REPLACE_WITH_USER_EMAIL_FIELD",
      passwordHash: "REPLACE_WITH_USER_PASSWORD_HASH_FIELD",
      role: "REPLACE_WITH_USER_ROLE_FIELD",
      createdAt: "REPLACE_WITH_USER_CREATED_AT_FIELD",
    },

    vehicle: {
      id: "REPLACE_WITH_VEHICLE_ID_FIELD",
      registrationNo: "REPLACE_WITH_REGISTRATION_FIELD",
      status: "REPLACE_WITH_VEHICLE_STATUS_FIELD",
      maxLoadCapacity: "REPLACE_WITH_CAPACITY_FIELD",
      odometer: "REPLACE_WITH_ODOMETER_FIELD",
    },

    driver: {
      id: "REPLACE_WITH_DRIVER_ID_FIELD",
      status: "REPLACE_WITH_DRIVER_STATUS_FIELD",
      licenseExpiryDate: "REPLACE_WITH_LICENSE_EXPIRY_FIELD",
      licenseNumber: "REPLACE_WITH_LICENSE_NUMBER_FIELD",
    },

    trip: {
      id: "REPLACE_WITH_TRIP_ID_FIELD",
      status: "REPLACE_WITH_TRIP_STATUS_FIELD",
      vehicleId: "REPLACE_WITH_TRIP_VEHICLE_ID_FIELD",
      driverId: "REPLACE_WITH_TRIP_DRIVER_ID_FIELD",
      cargoWeight: "REPLACE_WITH_CARGO_WEIGHT_FIELD",
    },
  },

  statuses: {
    vehicle: {
      available: "REPLACE_WITH_AVAILABLE_VEHICLE_VALUE",
      onTrip: "REPLACE_WITH_ON_TRIP_VEHICLE_VALUE",
      inShop: "REPLACE_WITH_IN_SHOP_VEHICLE_VALUE",
      retired: "REPLACE_WITH_RETIRED_VEHICLE_VALUE",
    },

    driver: {
      available: "REPLACE_WITH_AVAILABLE_DRIVER_VALUE",
      onTrip: "REPLACE_WITH_ON_TRIP_DRIVER_VALUE",
      suspended: "REPLACE_WITH_SUSPENDED_DRIVER_VALUE",
    },

    trip: {
      draft: "REPLACE_WITH_DRAFT_TRIP_VALUE",
      dispatched: "REPLACE_WITH_DISPATCHED_TRIP_VALUE",
      completed: "REPLACE_WITH_COMPLETED_TRIP_VALUE",
      cancelled: "REPLACE_WITH_CANCELLED_TRIP_VALUE",
    },
  },

  roles: {
    defaultRegistrationRole: "REPLACE_WITH_DEFAULT_USER_ROLE",
  },
};

module.exports = dbMap;