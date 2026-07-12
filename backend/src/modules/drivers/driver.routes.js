const router = require("express").Router();

const controller = require("./driver.controller");

const {
  createDriverSchema,
  updateDriverSchema,
} = require("./driver.validation");

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

router.get("/available", controller.available);

router.get("/", controller.getAll);

router.get("/:id", controller.getOne);

router.post(
  "/",
  allowRoles("ADMIN", "FLEET_MANAGER", "SAFETY_OFFICER"),
  validateBody(createDriverSchema),
  controller.create
);

router.patch(
  "/:id",
  allowRoles("ADMIN", "FLEET_MANAGER", "SAFETY_OFFICER"),
  validateBody(updateDriverSchema),
  controller.update
);

router.delete(
  "/:id",
  allowRoles("ADMIN", "FLEET_MANAGER"),
  controller.remove
);

module.exports = router;