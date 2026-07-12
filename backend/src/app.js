const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const vehicleRoutes = require("./modules/vehicles/vehicle.routes");
const driverRoutes = require("./modules/drivers/driver.routes");
const tripRoutes = require("./modules/trips/trip.routes");
const maintenanceRoutes = require("./modules/maintenance/maintenance.routes");
const fuelRoutes = require("./modules/fuel/fuel.routes");
const expenseRoutes = require("./modules/expenses/expense.routes");
const dashboardRoutes = require("./modules/dashboard/dashboard.routes");
const reportRoutes = require("./modules/reports/report.routes");

const { errorHandler } = require("./middleware/error.middleware");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "TransitOps backend is running",
  });
});

app.use("/api/vehicles", vehicleRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/fuel-logs", fuelRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reports", reportRoutes);

app.use(errorHandler);

module.exports = app;