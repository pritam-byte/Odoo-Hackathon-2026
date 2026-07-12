const { z } = require("zod");

const createMaintenanceSchema = z.object({
  vehicleId: z.string().uuid(),

  serviceType: z.string().trim().min(2).max(100),

  description: z.string().trim().max(1000).nullable(),

  cost: z.number().min(0),
});

module.exports = {
  createMaintenanceSchema,
};