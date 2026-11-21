import { Request, Response } from "express";

import { createProductModel } from "../models/createProductModel";
import {getCategoryIdByName} from "../models/categoryIdByNameModel"

export async function createProduct(
    req: Request,
    res: Response
) {
    try {

        const {
            name,
            description,
            price,
            stock,
            unit,
            category
        } = req.body;

        console.log("Recieved product add", name , description , price , stock , unit , category)

        if (
            !name ||
            !description ||
            price === undefined ||
            stock === undefined ||
            !unit ||
            !category
        ) {
            return res.status(400).json({
                message: "All product fields are required"
            });
        }

        const categoryId = await getCategoryIdByName(
        category
        );

        if (!categoryId) {
        throw new Error("Category not found");
    }



        const product = await createProductModel(
        name,
        description,
        price,
        stock,
        unit,
        categoryId
        );
 
        return res.status(201).json(product);

    } catch (error) {

        console.error(
            "Error creating product:",
            error
        );

        return res.status(500).json({
            message: "Failed to create product"
        });
    }
}