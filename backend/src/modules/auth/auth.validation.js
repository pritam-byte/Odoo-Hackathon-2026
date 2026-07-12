const { z } = require("zod");

const validRoles = [
  "ADMIN",
  "FLEET_MANAGER",
  "DISPATCHER",
  "DRIVER",
  "SAFETY_OFFICER",
  "FINANCIAL_ANALYST",
];

const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters")
    .max(100, "Name is too long"),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email address"),

  password: z
    .string()
    .min(6, "Password must contain at least 6 characters")
    .max(100, "Password is too long"),

  role: z
    .enum(validRoles)
    .optional()
    .default("FLEET_MANAGER"),
});

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required"),
});

module.exports = {
  registerSchema,
  loginSchema,
};