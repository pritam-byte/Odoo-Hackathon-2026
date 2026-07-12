const express = require("express");

const {
  register,
  login,
  logout,
  me,
} = require("./auth.controller");

const {
  registerSchema,
  loginSchema,
} = require("./auth.validation");

const {
  validateBody,
} = require("../../middleware/validate.middleware");

const {
  requireAuth,
} = require("../../middleware/auth.middleware");

const router = express.Router();

router.post(
  "/register",
  validateBody(registerSchema),
  register
);

router.post(
  "/login",
  validateBody(loginSchema),
  login
);

router.post(
  "/logout",
  logout
);

router.get(
  "/me",
  requireAuth,
  me
);

module.exports = router;
