const { z } = require("zod");

const roles = [
  "ADMIN",
  "FLEET_MANAGER",
  "DISPATCHER",
  "DRIVER",
  "SAFETY_OFFICER",
  "FINANCIAL_ANALYST",
];

const registerSchema = z.object({
  name: z.string().trim().min(2).max(100),

  email: z.string().trim().toLowerCase().email(),

  password: z.string().min(6).max(100),

  role: z.enum(roles).optional().default("DISPATCHER"),
});

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),

  password: z.string().min(1),
});

module.exports = {
  registerSchema,
  loginSchema,
};