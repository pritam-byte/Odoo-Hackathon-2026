const { z } = require("zod");

const createFuelSchema = z.object({
  vehicleId: z.string().uuid(),

  tripId: z.string().uuid().nullable(),

  liters: z.number().positive(),

  cost: z.number().min(0),

  odometer: z.number().min(0).nullable(),

  fuelDate: z.coerce.date().optional(),
});

module.exports = {
  createFuelSchema,
};