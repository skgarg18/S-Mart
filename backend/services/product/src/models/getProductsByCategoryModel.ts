import pool from "../db/pool";
import { Product } from "../types/ProductsInterface";

export async function getProductsByCategoryModel(category: string) : Promise<Product> {

    console.log("Fetching products for category:", category); // Debugging line
    
    const result = await pool.query(
        `SELECT
            p.id,
            p.name,
            p.description,
            p.price,
            p.stock,
            p.unit,
            p.image_url,
            p.is_active,
            c.name AS category
        FROM products p
        JOIN categories c
            ON p.category_id = c.id
        WHERE p.is_active = true
        AND LOWER(c.name) = LOWER(TRIM($1))
        ORDER BY p.id;`,
        [category]
    );

    console.log("Products by category:", result.rows); // Debugging line

    return result.rows;
}