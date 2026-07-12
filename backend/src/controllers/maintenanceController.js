import prisma from "../config/prisma.js";

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({ status, message, data });
};

// Create Maintenance Log
export const createMaintenanceLog = async (req, res, next) => {
    try {
        const { vehicleId, serviceType, description } = req.body;

        const vehicle = await prisma.vehicle.findUnique({ where: { id: vehicleId } });
        if (!vehicle) return handleResponse(res, 404, "Vehicle not found");
        if (vehicle.status === 'RETIRED') {
            return handleResponse(res, 400, "Cannot perform maintenance on a retired vehicle");
        }

        const result = await prisma.$transaction([
            prisma.maintenanceLog.create({
                data: {
                    vehicleId,
                    serviceType,
                    description,
                    status: 'OPEN'
                }
            }),
            prisma.vehicle.update({
                where: { id: vehicleId },
                data: { status: 'IN_SHOP' }
            })
        ]);

        handleResponse(res, 201, "Maintenance log created successfully", result[0]);
    } catch (error) {
        next(error);
    }
};

// Close Maintenance Log
export const closeMaintenanceLog = async (req, res, next) => {
    try {
        const logId = req.params.id;
        const { cost } = req.body;

        const log = await prisma.maintenanceLog.findUnique({ where: { id: logId } });
        if (!log) return handleResponse(res, 404, "Maintenance log not found");
        if (log.status !== 'OPEN') {
            return handleResponse(res, 400, "Maintenance log is already closed");
        }

        // We check if vehicle should go back to available, unless it was retired manually.
        // For simplicity, we just set it back to AVAILABLE as per rules.
        const result = await prisma.$transaction([
            prisma.maintenanceLog.update({
                where: { id: logId },
                data: {
                    status: 'CLOSED',
                    cost,
                    closedAt: new Date()
                }
            }),
            prisma.vehicle.update({
                where: { id: log.vehicleId },
                data: { status: 'AVAILABLE' }
            })
        ]);

        handleResponse(res, 200, "Maintenance log closed successfully", result[0]);
    } catch (error) {
        next(error);
    }
};

export const getAllMaintenanceLogs = async (req, res, next) => {
    try {
        const logs = await prisma.maintenanceLog.findMany({
            include: { vehicle: true },
            orderBy: { createdAt: 'desc' }
        });
        handleResponse(res, 200, "Maintenance logs fetched", logs);
    } catch (error) {
        next(error);
    }
};
