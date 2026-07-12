const express = require("express");

const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("./vehicle.controller");

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

const router = express.Router();

router.get(
  "/",
  requireAuth,
  getAll
);

router.get(
  "/:id",
  requireAuth,
  getOne
);

router.post(
  "/",
  requireAuth,
  allowRoles("ADMIN", "FLEET_MANAGER"),
  validateBody(createVehicleSchema),
  create
);

router.patch(
  "/:id",
  requireAuth,
  allowRoles("ADMIN", "FLEET_MANAGER"),
  validateBody(updateVehicleSchema),
  update
);

router.delete(
  "/:id",
  requireAuth,
  allowRoles("ADMIN", "FLEET_MANAGER"),
  remove
);

module.exports = router;