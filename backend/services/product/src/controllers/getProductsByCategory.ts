import { Request, Response } from "express";

import {getProductsByCategoryModel} from "../models/getProductsByCategoryModel"

import { Product } from "../types/ProductsInterface";

export async function getProductsByCategory(
    req: Request<{ category: string }>,
    res: Response
) {

    console.log(req)
    
    const category:string = req.params.category;

    try {
        const products:Promise<Product> = await getProductsByCategoryModel(category);

        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products by category:", error);

        res.status(500).json({
            message: "Failed to fetch products by category"
        });
    }
}