import prisma from "../config/prisma.js";

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({ status, message, data });
};

export const createDriver = async (req, res, next) => {
    try {
        const { name, licenseNumber, licenseCategory, licenseExpiryDate, contactNumber } = req.body;

        const newDriver = await prisma.driver.create({
            data: {
                name,
                licenseNumber,
                licenseCategory,
                licenseExpiryDate: new Date(licenseExpiryDate),
                contactNumber
            }
        });

        handleResponse(res, 201, "Driver created successfully", newDriver);
    } catch (error) {
        if (error.code === 'P2002' && error.meta.target.includes('licenseNumber')) {
            return handleResponse(res, 400, "License number already exists");
        }
        next(error);
    }
};

export const getAllDrivers = async (req, res, next) => {
    try {
        const drivers = await prisma.driver.findMany({
            orderBy: { createdAt: 'desc' }
        });
        handleResponse(res, 200, "Drivers fetched successfully", drivers);
    } catch (error) {
        next(error);
    }
};

export const getAvailableDrivers = async (req, res, next) => {
    try {
        const currentDate = new Date();
        const availableDrivers = await prisma.driver.findMany({
            where: {
                status: 'AVAILABLE',
                licenseExpiryDate: { gt: currentDate }
            },
            orderBy: { createdAt: 'desc' }
        });
        handleResponse(res, 200, "Available drivers fetched", availableDrivers);
    } catch (error) {
        next(error);
    }
};

export const getDriverById = async (req, res, next) => {
    try {
        const driver = await prisma.driver.findUnique({
            where: { id: req.params.id }
        });
        if (!driver) return handleResponse(res, 404, "Driver not found");
        handleResponse(res, 200, "Driver fetched successfully", driver);
    } catch (error) {
        next(error);
    }
};

export const updateDriver = async (req, res, next) => {
    try {
        const data = { ...req.body };
        if (data.licenseExpiryDate) {
            data.licenseExpiryDate = new Date(data.licenseExpiryDate);
        }

        const updatedDriver = await prisma.driver.update({
            where: { id: req.params.id },
            data
        });
        handleResponse(res, 200, "Driver updated successfully", updatedDriver);
    } catch (error) {
        if (error.code === 'P2025') return handleResponse(res, 404, "Driver not found");
        next(error);
    }
};

export const deleteDriver = async (req, res, next) => {
    try {
        const deletedDriver = await prisma.driver.delete({
            where: { id: req.params.id }
        });
        handleResponse(res, 200, "Driver deleted successfully", deletedDriver);
    } catch (error) {
        if (error.code === 'P2025') return handleResponse(res, 404, "Driver not found");
        next(error);
    }
};
