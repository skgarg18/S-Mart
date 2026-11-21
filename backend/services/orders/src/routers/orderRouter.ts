import { Router } from "express";

import { getOrderSummary } from "../controllers/orderSummaryController";

import { authenticate } from "../authenticate";
import { requireAdmin } from "../authenticate";

const router = Router();

router.get("/admin/summary",authenticate , requireAdmin ,  getOrderSummary);

export default router;