const router = require("express").Router();

const controller = require("./vehicle.controller");

const {
  createVehicleSchema,
  updateVehicleSchema,
} = require("./vehicle.validation");

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

router.get("/:id", controller.getOne);

router.post(
  "/",
  allowRoles("ADMIN", "FLEET_MANAGER"),
  validateBody(createVehicleSchema),
  controller.create
);

router.patch(
  "/:id",
  allowRoles("ADMIN", "FLEET_MANAGER"),
  validateBody(updateVehicleSchema),
  controller.update
);

router.delete(
  "/:id",
  allowRoles("ADMIN", "FLEET_MANAGER"),
  controller.remove
);

module.exports = router;