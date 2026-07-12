const asyncHandler = require("../../utils/async-handler");
const fuelService = require("./fuel.service");

const create = asyncHandler(async (req, res) => {
  const fuelLog = await fuelService.createFuel(req.body);

  res.status(201).json({
    success: true,
    message: "Fuel log added successfully.",
    data: { fuelLog },
  });
});

const getAll = asyncHandler(async (req, res) => {
  const fuelLogs = await fuelService.getFuelLogs(req.query);

  res.json({
    success: true,
    total: fuelLogs.length,
    data: { fuelLogs },
  });
});

module.exports = {
  create,
  getAll,
};