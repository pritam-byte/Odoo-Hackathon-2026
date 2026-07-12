import express from "express";
import { getDashboardKPIs, getReports } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/kpis", getDashboardKPIs);
router.get("/reports", getReports);

export default router;
