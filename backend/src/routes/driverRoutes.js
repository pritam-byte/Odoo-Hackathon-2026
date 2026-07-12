import express from "express";
import { 
    createDriver, 
    getAllDrivers, 
    getAvailableDrivers, 
    getDriverById, 
    updateDriver, 
    deleteDriver 
} from "../controllers/driverController.js";

const router = express.Router();

router.get("/available", getAvailableDrivers);
router.post("/", createDriver);
router.get("/", getAllDrivers);
router.get("/:id", getDriverById);
router.put("/:id", updateDriver);
router.delete("/:id", deleteDriver);

export default router;
