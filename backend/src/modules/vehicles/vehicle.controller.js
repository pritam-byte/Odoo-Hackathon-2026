const asyncHandler = require("../../utils/async-handler");
const vehicleService = require("./vehicle.service");

const create = asyncHandler(async (req, res) => {
  const vehicle = await vehicleService.createVehicle(req.body);

  res.status(201).json({
    success: true,
    message: "Vehicle created successfully.",
    data: { vehicle },
  });
});

const getAll = asyncHandler(async (req, res) => {
  const vehicles = await vehicleService.getVehicles(req.query);

  res.json({
    success: true,
    total: vehicles.length,
    data: { vehicles },
  });
});

const getOne = asyncHandler(async (req, res) => {
  const vehicle = await vehicleService.getVehicle(req.params.id);

  res.json({
    success: true,
    data: { vehicle },
  });
});

const update = asyncHandler(async (req, res) => {
  const vehicle = await vehicleService.updateVehicle(
    req.params.id,
    req.body
  );

  res.json({
    success: true,
    message: "Vehicle updated successfully.",
    data: { vehicle },
  });
});

const remove = asyncHandler(async (req, res) => {
  const vehicle = await vehicleService.deleteVehicle(req.params.id);

  res.json({
    success: true,
    message: "Vehicle deleted successfully.",
    data: { vehicle },
  });
});

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
};