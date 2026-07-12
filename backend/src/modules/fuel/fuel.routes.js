const router = require("express").Router();

const controller = require("./fuel.controller");

const {
  createFuelSchema,
} = require("./fuel.validation");

const {
  validateBody,
} = require("../../middleware/validate.middleware");

const {
  requireAuth,
} = require("../../middleware/auth.middleware");

const {
  allowRoles,
} = require("../../middleware/role.middleware");

router.use(requireAuth);

router.get("/", controller.getAll);

router.post(
  "/",
  allowRoles(
    "ADMIN",
    "FLEET_MANAGER",
    "DISPATCHER",
    "FINANCIAL_ANALYST"
  ),
  validateBody(createFuelSchema),
  controller.create
);

module.exports = router;