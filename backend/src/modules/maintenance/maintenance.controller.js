const asyncHandler = require("../../utils/async-handler");
const maintenanceService = require("./maintenance.service");

const create = asyncHandler(async (req, res) => {
  const maintenance = await maintenanceService.openMaintenance(
    req.body
  );

  res.status(201).json({
    success: true,
    message: "Maintenance opened and vehicle moved to In Shop.",
    data: { maintenance },
  });
});

const getAll = asyncHandler(async (req, res) => {
  const maintenanceLogs = await maintenanceService.getLogs(
    req.query
  );

  res.json({
    success: true,
    total: maintenanceLogs.length,
    data: { maintenanceLogs },
  });
});

const getOne = asyncHandler(async (req, res) => {
  const maintenance = await maintenanceService.getLog(req.params.id);

  res.json({
    success: true,
    data: { maintenance },
  });
});

const close = asyncHandler(async (req, res) => {
  const maintenance = await maintenanceService.closeMaintenance(
    req.params.id
  );

  res.json({
    success: true,
    message: "Maintenance closed successfully.",
    data: { maintenance },
  });
});

module.exports = {
  create,
  getAll,
  getOne,
  close,
};