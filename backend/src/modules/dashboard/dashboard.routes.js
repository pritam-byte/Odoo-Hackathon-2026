const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Dashboard route is ready. Database integration is pending.",
  });
});

module.exports = router;