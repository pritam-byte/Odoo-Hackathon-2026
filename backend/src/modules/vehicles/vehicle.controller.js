const {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} = require("./vehicle.service");

const create = async (req, res, next) => {
  try {
    const vehicle = await createVehicle(req.body);

    return res.status(201).json({
      success: true,
      message: "Vehicle created successfully.",
      data: {
        vehicle,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const vehicles = await getVehicles(req.query);

    return res.status(200).json({
      success: true,
      total: vehicles.length,
      data: {
        vehicles,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const vehicle = await getVehicleById(req.params.id);

    return res.status(200).json({
      success: true,
      data: {
        vehicle,
      },
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const vehicle = await updateVehicle(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Vehicle updated successfully.",
      data: {
        vehicle,
      },
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const vehicle = await deleteVehicle(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully.",
      data: {
        vehicle,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
};
