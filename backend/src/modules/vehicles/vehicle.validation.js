const router = require("express").Router();

const controller = require("./auth.controller");
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

router.post(
  "/register",
  validateBody(registerSchema),
  controller.register
);

router.post(
  "/login",
  validateBody(loginSchema),
  controller.login
);

router.post("/logout", controller.logout);

router.get("/me", requireAuth, controller.me);

module.exports = router;