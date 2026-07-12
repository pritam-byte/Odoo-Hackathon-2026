import express from "express";
import { 
    createVehicle, 
    getAllVehicles, 
    getAvailableVehicles, 
    getVehicleById, 
    updateVehicle, 
    deleteVehicle 
} from "../controllers/vehicleController.js";

const router = express.Router();

router.get("/available", getAvailableVehicles);
router.post("/", createVehicle);
router.get("/", getAllVehicles);
router.get("/:id", getVehicleById);
router.put("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);

export default router;
