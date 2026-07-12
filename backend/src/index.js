import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import errorHandling from "./midllewares/errorHandler.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import driverRoutes from "./routes/driverRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import maintenanceRoutes from "./routes/maintenanceRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Error handling middleware
app.use(errorHandling);

app.get("/", (req, res) => {
    res.send("Fleet Management API is running!");
});

// Server running
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});