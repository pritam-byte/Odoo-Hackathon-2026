const asyncHandler = require("../../utils/async-handler");
const tripService = require("./trip.service");

const create = asyncHandler(async (req, res) => {
  const trip = await tripService.createTrip(req.body);

  res.status(201).json({
    success: true,
    message: "Trip created as draft.",
    data: { trip },
  });
});

const getAll = asyncHandler(async (req, res) => {
  const trips = await tripService.getTrips(req.query);

  res.json({
    success: true,
    total: trips.length,
    data: { trips },
  });
});

const getOne = asyncHandler(async (req, res) => {
  const trip = await tripService.getTrip(req.params.id);

  res.json({
    success: true,
    data: { trip },
  });
});

const dispatch = asyncHandler(async (req, res) => {
  const trip = await tripService.dispatchTrip(req.params.id);

  res.json({
    success: true,
    message: "Trip dispatched successfully.",
    data: { trip },
  });
});

const complete = asyncHandler(async (req, res) => {
  const trip = await tripService.completeTrip(
    req.params.id,
    req.body
  );

  res.json({
    success: true,
    message: "Trip completed successfully.",
    data: { trip },
  });
});

const cancel = asyncHandler(async (req, res) => {
  const trip = await tripService.cancelTrip(req.params.id);

  res.json({
    success: true,
    message: "Trip cancelled successfully.",
    data: { trip },
  });
});

module.exports = {
  create,
  getAll,
  getOne,
  dispatch,
  complete,
  cancel,
};