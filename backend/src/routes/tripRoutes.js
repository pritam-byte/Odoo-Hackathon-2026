import express from "express";
import { 
    dispatchTrip, 
    completeTrip, 
    cancelTrip, 
    getAllTrips 
} from "../controllers/tripController.js";

const router = express.Router();

router.post("/dispatch", dispatchTrip);
router.put("/:id/complete", completeTrip);
router.put("/:id/cancel", cancelTrip);
router.get("/", getAllTrips);

export default router;
