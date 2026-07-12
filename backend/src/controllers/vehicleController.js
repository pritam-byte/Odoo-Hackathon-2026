import prisma from "../config/prisma.js";

// Standardized response helper
const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({ status, message, data });
};

// Create a new vehicle
export const createVehicle = async (req, res, next) => {
    try {
        const { registrationNo, name, model, type, region, maxLoadCapacity, acquisitionCost } = req.body;

        const newVehicle = await prisma.vehicle.create({
            data: {
                registrationNo,
                name,
                model,
                type,
                region,
                maxLoadCapacity,
                acquisitionCost
            }
        });

        handleResponse(res, 201, "Vehicle created successfully", newVehicle);
    } catch (error) {
        if (error.code === 'P2002' && error.meta.target.includes('registrationNo')) {
            return handleResponse(res, 400, "Registration number already exists");
        }
        next(error);
    }
};

// Get all vehicles
export const getAllVehicles = async (req, res, next) => {
    try {
        const vehicles = await prisma.vehicle.findMany({
            orderBy: { createdAt: 'desc' }
        });
        handleResponse(res, 200, "Vehicles fetched successfully", vehicles);
    } catch (error) {
        next(error);
    }
};

// Get vehicles available for dispatch
export const getAvailableVehicles = async (req, res, next) => {
    try {
        const availableVehicles = await prisma.vehicle.findMany({
            where: {
                status: 'AVAILABLE'
            },
            orderBy: { createdAt: 'desc' }
        });
        handleResponse(res, 200, "Available vehicles fetched", availableVehicles);
    } catch (error) {
        next(error);
    }
};

// Get vehicle by ID
export const getVehicleById = async (req, res, next) => {
    try {
        const vehicle = await prisma.vehicle.findUnique({
            where: { id: req.params.id }
        });
        if (!vehicle) return handleResponse(res, 404, "Vehicle not found");
        handleResponse(res, 200, "Vehicle fetched successfully", vehicle);
    } catch (error) {
        next(error);
    }
};

// Update vehicle
export const updateVehicle = async (req, res, next) => {
    try {
        const updatedVehicle = await prisma.vehicle.update({
            where: { id: req.params.id },
            data: req.body
        });
        handleResponse(res, 200, "Vehicle updated successfully", updatedVehicle);
    } catch (error) {
        if (error.code === 'P2025') return handleResponse(res, 404, "Vehicle not found");
        next(error);
    }
};

// Delete vehicle
export const deleteVehicle = async (req, res, next) => {
    try {
        const deletedVehicle = await prisma.vehicle.delete({
            where: { id: req.params.id }
        });
        handleResponse(res, 200, "Vehicle deleted successfully", deletedVehicle);
    } catch (error) {
        if (error.code === 'P2025') return handleResponse(res, 404, "Vehicle not found");
        next(error);
    }
};
