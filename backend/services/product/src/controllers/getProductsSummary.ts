import { Request, Response } from "express";

import { getProductSummaryModel } from "../models/getProductSummaryModel";


export async function getProductsSummary(
    req: Request,
    res: Response
) {
    try {
        const summary = await getProductSummaryModel();

        const products = summary.map((item) => ({
            category: item.category,
            productCount: Number(item.product_count)
        }));
        
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching product summary:", error);

        res.status(500).json({
            message: "Failed to fetch product summary"
        });
    }
}
