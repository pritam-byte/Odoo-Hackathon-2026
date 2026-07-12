const router = require("express").Router();

const controller = require("./report.controller");

const {
  requireAuth,
} = require("../../middleware/auth.middleware");

const {
  allowRoles,
} = require("../../middleware/role.middleware");

router.use(requireAuth);

router.get(
  "/fuel-efficiency",
  controller.fuelEfficiency
);

router.get(
  "/vehicle-costs",
  allowRoles("ADMIN", "FLEET_MANAGER", "FINANCIAL_ANALYST"),
  controller.vehicleCosts
);

router.get(
  "/export/vehicle-costs.csv",
  allowRoles("ADMIN", "FLEET_MANAGER", "FINANCIAL_ANALYST"),
  controller.exportVehicleCosts
);

module.exports = router;