import { Request, Response } from "express";

import { getAllProductsModel } from "../models/getAllProductsModel";

import { Product } from "../types/ProductsInterface";

export async function getProducts(
    req: Request,
    res: Response
) {
    try {
        const products:Promise<Product> = await getAllProductsModel();

        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);

        res.status(500).json({
            message: "Failed to fetch products"
        });
    }
}