const router = require("express").Router();

const {
  getDashboard,
} = require("./dashboard.controller");

const {
  requireAuth,
} = require("../../middleware/auth.middleware");

router.get("/", requireAuth, getDashboard);

module.exports = router;