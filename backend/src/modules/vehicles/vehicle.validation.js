const { z } = require("zod");

const vehicleTypes = [
  "VAN",
  "TRUCK",
  "BUS",
  "PICKUP",
  "CAR",
  "OTHER",
];

const vehicleFields = {
  name: z.string().trim().min(2).max(100),

  model: z.string().trim().min(2).max(100),

  type: z.enum(vehicleTypes),

  region: z.string().trim().min(2).max(100).nullable(),

  maxLoadCapacity: z.number().positive(),

  odometer: z.number().min(0),

  acquisitionCost: z.number().min(0),
};

const createVehicleSchema = z.object({
  registrationNo: z
    .string()
    .trim()
    .min(3)
    .max(50)
    .toUpperCase(),

  ...vehicleFields,
});

const updateVehicleSchema = z.object(vehicleFields).partial();

module.exports = {
  createVehicleSchema,
  updateVehicleSchema,
};