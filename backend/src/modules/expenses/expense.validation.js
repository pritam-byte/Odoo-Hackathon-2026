const { z } = require("zod");

const categories = [
  "TOLL",
  "PARKING",
  "INSURANCE",
  "REPAIR",
  "OTHER",
];

const createExpenseSchema = z.object({
  vehicleId: z.string().uuid(),

  tripId: z.string().uuid().nullable(),

  category: z.enum(categories),

  amount: z.number().positive(),

  description: z.string().trim().max(1000).nullable(),

  expenseDate: z.coerce.date().optional(),
});

module.exports = {
  createExpenseSchema,
};