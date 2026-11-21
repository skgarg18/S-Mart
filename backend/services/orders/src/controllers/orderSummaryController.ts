import { Request, Response } from "express";
import {getOrderSummaryModel} from "../models/orderSummaryModel"

import { OrderSummaryInterface } from "../types/orderSummaryType";

export async function getOrderSummary(
    req: Request,
    res: Response
) {
    try {
        const orderSummary:Promise<OrderSummaryInterface> = await getOrderSummaryModel();

        const summary = {
            totalOrders: Number(orderSummary.total_orders),
            totalAmount: Number(orderSummary.total_amount)
        };

        res.status(200).json(summary);
    } catch (error) {
        console.error("Error fetching order summary:", error);

        res.status(500).json({
            message: "Failed to fetch order summary"
        });
    }
}