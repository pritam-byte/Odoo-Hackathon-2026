const asyncHandler = require("../../utils/async-handler");

const dashboardService = require("./dashboard.service");

const getDashboard = asyncHandler(async (req, res) => {
  const dashboard = await dashboardService.getDashboard(
    req.query
  );

  res.json({
    success: true,
    data: dashboard,
  });
});

module.exports = {
  getDashboard,
};