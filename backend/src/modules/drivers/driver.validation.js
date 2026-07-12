const { z } = require("zod");

const driverFields = {
  name: z.string().trim().min(2).max(100),

  licenseCategory: z.string().trim().min(2).max(100),

  licenseExpiryDate: z.coerce.date(),

  contactNumber: z.string().trim().min(7).max(25),

  safetyScore: z.number().min(0).max(100),

  userId: z.string().uuid().nullable(),
};

const createDriverSchema = z.object({
  licenseNumber: z
    .string()
    .trim()
    .min(3)
    .max(100)
    .toUpperCase(),

  ...driverFields,
});

const updateDriverSchema = z.object(driverFields).partial();

module.exports = {
  createDriverSchema,
  updateDriverSchema,
};