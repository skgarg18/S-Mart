import pool from "../db/pool";
import { Product } from "../types/ProductsInterface";

export async function getAllProductsModel() : Promise<Product> {
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
        ORDER BY p.id;`
    );

    return result.rows;
}