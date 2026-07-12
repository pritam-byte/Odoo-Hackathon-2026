const router = require("express").Router();

const controller = require("./trip.controller");

const {
  createTripSchema,
  completeTripSchema,
} = require("./trip.validation");

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
  allowRoles("ADMIN", "FLEET_MANAGER", "DISPATCHER"),
  validateBody(createTripSchema),
  controller.create
);

router.patch(
  "/:id/dispatch",
  allowRoles("ADMIN", "FLEET_MANAGER", "DISPATCHER"),
  controller.dispatch
);

router.patch(
  "/:id/complete",
  allowRoles("ADMIN", "FLEET_MANAGER", "DISPATCHER"),
  validateBody(completeTripSchema),
  controller.complete
);

router.patch(
  "/:id/cancel",
  allowRoles("ADMIN", "FLEET_MANAGER", "DISPATCHER"),
  controller.cancel
);

module.exports = router;