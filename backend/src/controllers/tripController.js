import prisma from "../config/prisma.js";

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({ status, message, data });
};

// Create and Dispatch a Trip
export const dispatchTrip = async (req, res, next) => {
    try {
        const { source, destination, cargoWeight, plannedDistance, revenue, vehicleId, driverId } = req.body;

        // Validations
        const vehicle = await prisma.vehicle.findUnique({ where: { id: vehicleId } });
        if (!vehicle) return handleResponse(res, 404, "Vehicle not found");
        
        if (cargoWeight > vehicle.maxLoadCapacity) {
            return handleResponse(res, 400, `Cargo weight (${cargoWeight}kg) exceeds vehicle max capacity (${vehicle.maxLoadCapacity}kg)`);
        }
        if (vehicle.status !== 'AVAILABLE') {
            return handleResponse(res, 400, `Vehicle is not available. Current status: ${vehicle.status}`);
        }

        const driver = await prisma.driver.findUnique({ where: { id: driverId } });
        if (!driver) return handleResponse(res, 404, "Driver not found");

        if (driver.status !== 'AVAILABLE') {
            return handleResponse(res, 400, `Driver is not available. Current status: ${driver.status}`);
        }
        if (new Date(driver.licenseExpiryDate) < new Date()) {
            return handleResponse(res, 400, "Driver license has expired");
        }

        // Transaction
        const result = await prisma.$transaction([
            prisma.trip.create({
                data: {
                    source,
                    destination,
                    cargoWeight,
                    plannedDistance,
                    revenue,
                    vehicleId,
                    driverId,
                    startOdometer: vehicle.odometer,
                    status: 'DISPATCHED',
                    dispatchedAt: new Date()
                }
            }),
            prisma.vehicle.update({
                where: { id: vehicleId },
                data: { status: 'ON_TRIP' }
            }),
            prisma.driver.update({
                where: { id: driverId },
                data: { status: 'ON_TRIP' }
            })
        ]);

        handleResponse(res, 201, "Trip dispatched successfully", result[0]);
    } catch (error) {
        next(error);
    }
};

// Complete a Trip
export const completeTrip = async (req, res, next) => {
    try {
        const { endOdometer, actualDistance, fuelLiters, fuelCost } = req.body;
        const tripId = req.params.id;

        const trip = await prisma.trip.findUnique({ where: { id: tripId } });
        if (!trip) return handleResponse(res, 404, "Trip not found");
        if (trip.status !== 'DISPATCHED') {
            return handleResponse(res, 400, `Cannot complete trip with status: ${trip.status}`);
        }

        const result = await prisma.$transaction([
            prisma.trip.update({
                where: { id: tripId },
                data: {
                    status: 'COMPLETED',
                    endOdometer,
                    actualDistance,
                    completedAt: new Date()
                }
            }),
            prisma.fuelLog.create({
                data: {
                    vehicleId: trip.vehicleId,
                    tripId: trip.id,
                    liters: fuelLiters,
                    cost: fuelCost,
                    odometer: endOdometer
                }
            }),
            prisma.vehicle.update({
                where: { id: trip.vehicleId },
                data: { status: 'AVAILABLE', odometer: endOdometer }
            }),
            prisma.driver.update({
                where: { id: trip.driverId },
                data: { status: 'AVAILABLE' }
            })
        ]);

        handleResponse(res, 200, "Trip completed successfully", result[0]);
    } catch (error) {
        next(error);
    }
};

// Cancel a Trip
export const cancelTrip = async (req, res, next) => {
    try {
        const tripId = req.params.id;

        const trip = await prisma.trip.findUnique({ where: { id: tripId } });
        if (!trip) return handleResponse(res, 404, "Trip not found");
        if (trip.status !== 'DISPATCHED') {
            return handleResponse(res, 400, `Cannot cancel trip with status: ${trip.status}`);
        }

        const result = await prisma.$transaction([
            prisma.trip.update({
                where: { id: tripId },
                data: { status: 'CANCELLED' }
            }),
            prisma.vehicle.update({
                where: { id: trip.vehicleId },
                data: { status: 'AVAILABLE' }
            }),
            prisma.driver.update({
                where: { id: trip.driverId },
                data: { status: 'AVAILABLE' }
            })
        ]);

        handleResponse(res, 200, "Trip cancelled successfully", result[0]);
    } catch (error) {
        next(error);
    }
};

export const getAllTrips = async (req, res, next) => {
    try {
        const trips = await prisma.trip.findMany({
            include: {
                vehicle: true,
                driver: true
            },
            orderBy: { createdAt: 'desc' }
        });
        handleResponse(res, 200, "Trips fetched successfully", trips);
    } catch (error) {
        next(error);
    }
};
