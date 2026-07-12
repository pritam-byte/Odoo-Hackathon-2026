const { z } = require("zod");

const createTripSchema = z.object({
  source: z.string().trim().min(2),

  destination: z.string().trim().min(2),

  vehicleId: z.string().uuid(),

  driverId: z.string().uuid(),

  cargoWeight: z.number().positive(),

  plannedDistance: z.number().positive(),
});

const completeTripSchema = z.object({
  actualDistance: z.number().positive(),

  endOdometer: z.number().min(0),

  revenue: z.number().min(0),
});

module.exports = {
  createTripSchema,
  completeTripSchema,
};