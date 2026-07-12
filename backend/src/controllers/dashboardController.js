import prisma from "../config/prisma.js";

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({ status, message, data });
};

export const getDashboardKPIs = async (req, res, next) => {
    try {
        const totalVehicles = await prisma.vehicle.count();
        
        // Active vehicles are those currently On Trip
        const activeVehicles = await prisma.vehicle.count({ where: { status: 'ON_TRIP' } });
        const availableVehicles = await prisma.vehicle.count({ where: { status: 'AVAILABLE' } });
        const vehiclesInMaintenance = await prisma.vehicle.count({ where: { status: 'IN_SHOP' } });
        
        const activeTrips = await prisma.trip.count({ where: { status: 'DISPATCHED' } });
        const pendingTrips = await prisma.trip.count({ where: { status: 'DRAFT' } });
        
        const driversOnDuty = await prisma.driver.count({ where: { status: 'ON_TRIP' } });
        
        const fleetUtilization = totalVehicles > 0 ? ((activeVehicles / totalVehicles) * 100).toFixed(2) : 0;

        const kpis = {
            totalVehicles,
            activeVehicles,
            availableVehicles,
            vehiclesInMaintenance,
            activeTrips,
            pendingTrips,
            driversOnDuty,
            fleetUtilization: parseFloat(fleetUtilization)
        };

        handleResponse(res, 200, "KPIs fetched successfully", kpis);
    } catch (error) {
        next(error);
    }
};

export const getReports = async (req, res, next) => {
    try {
        // Operational Cost = Fuel + Maintenance
        const fuelResult = await prisma.fuelLog.aggregate({
            _sum: { cost: true, liters: true }
        });
        const maintenanceResult = await prisma.maintenanceLog.aggregate({
            _sum: { cost: true }
        });
        const expensesResult = await prisma.expense.aggregate({
            _sum: { amount: true }
        });

        const totalFuelCost = fuelResult._sum.cost || 0;
        const totalMaintenanceCost = maintenanceResult._sum.cost || 0;
        const totalOtherExpenses = expensesResult._sum.amount || 0;
        const totalOperationalCost = totalFuelCost + totalMaintenanceCost + totalOtherExpenses;

        const totalFuelLiters = fuelResult._sum.liters || 0;

        // Total distance covered (sum of actualDistance in COMPLETED trips)
        const tripResult = await prisma.trip.aggregate({
            _sum: { actualDistance: true, revenue: true },
            where: { status: 'COMPLETED' }
        });
        const totalDistance = tripResult._sum.actualDistance || 0;
        const totalRevenue = tripResult._sum.revenue || 0;

        // Fuel Efficiency (Distance / Fuel)
        const fuelEfficiency = totalFuelLiters > 0 ? (totalDistance / totalFuelLiters).toFixed(2) : 0;

        // Acquisition Cost of all vehicles
        const vehicleResult = await prisma.vehicle.aggregate({
            _sum: { acquisitionCost: true }
        });
        const totalAcquisitionCost = vehicleResult._sum.acquisitionCost || 0;

        // Vehicle ROI = (Revenue - (Maintenance + Fuel)) / Acquisition Cost
        let roi = 0;
        if (totalAcquisitionCost > 0) {
            roi = ((totalRevenue - (totalMaintenanceCost + totalFuelCost)) / totalAcquisitionCost) * 100;
        }

        const report = {
            totalOperationalCost,
            fuelEfficiency: parseFloat(fuelEfficiency),
            totalRevenue,
            fleetROI: parseFloat(roi.toFixed(2))
        };

        handleResponse(res, 200, "Reports generated successfully", report);
    } catch (error) {
        next(error);
    }
};
