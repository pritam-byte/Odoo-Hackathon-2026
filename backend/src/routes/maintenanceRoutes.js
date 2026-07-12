import express from "express";
import { 
    createMaintenanceLog, 
    closeMaintenanceLog, 
    getAllMaintenanceLogs 
} from "../controllers/maintenanceController.js";

const router = express.Router();

router.post("/", createMaintenanceLog);
router.put("/:id/close", closeMaintenanceLog);
router.get("/", getAllMaintenanceLogs);

export default router;
