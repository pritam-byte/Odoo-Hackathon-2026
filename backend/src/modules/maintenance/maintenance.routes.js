const router = require("express").Router();

const controller = require("./maintenance.controller");

const {
  createMaintenanceSchema,
} = require("./maintenance.validation");

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
  validateBody(createMaintenanceSchema),
  controller.create
);

router.patch(
  "/:id/close",
  allowRoles("ADMIN", "FLEET_MANAGER"),
  controller.close
);

module.exports = router;