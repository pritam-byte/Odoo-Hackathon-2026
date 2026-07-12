const asyncHandler = require("../../utils/async-handler");
const driverService = require("./driver.service");

const create = asyncHandler(async (req, res) => {
  const driver = await driverService.createDriver(req.body);

  res.status(201).json({
    success: true,
    message: "Driver created successfully.",
    data: { driver },
  });
});

const getAll = asyncHandler(async (req, res) => {
  const drivers = await driverService.getDrivers(req.query);

  res.json({
    success: true,
    total: drivers.length,
    data: { drivers },
  });
});

const getOne = asyncHandler(async (req, res) => {
  const driver = await driverService.getDriver(req.params.id);

  res.json({
    success: true,
    data: { driver },
  });
});

const update = asyncHandler(async (req, res) => {
  const driver = await driverService.updateDriver(
    req.params.id,
    req.body
  );

  res.json({
    success: true,
    message: "Driver updated successfully.",
    data: { driver },
  });
});

const remove = asyncHandler(async (req, res) => {
  const driver = await driverService.deleteDriver(req.params.id);

  res.json({
    success: true,
    message: "Driver deleted successfully.",
    data: { driver },
  });
});

const available = asyncHandler(async (req, res) => {
  const drivers = await driverService.availableDrivers();

  res.json({
    success: true,
    data: { drivers },
  });
});

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
  available,
};