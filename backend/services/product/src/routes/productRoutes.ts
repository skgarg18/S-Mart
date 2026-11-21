import { Router } from "express";

import { getProducts } from "../controllers/getAllProducts";
import { getProductsByCategory } from "../controllers/getProductsByCategory";
import { getProductsSummary } from "../controllers/getProductsSummary";
import { createProduct } from "../controllers/createProduct";

import { authenticate, requireAdmin } from "../authenticate";

const router = Router();

router.get("/", getProducts);

router.get("/admin/summary" ,authenticate , requireAdmin, getProductsSummary)
router.get("/:category", getProductsByCategory);

router.post("/admin/:category/add" , authenticate , requireAdmin,createProduct);

export default router;