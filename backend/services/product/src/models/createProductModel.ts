import pool from "../db/pool"


export async function createProductModel(
    name: string,
    description: string,
    price: number,
    stock: number,
    unit: string,
    categoryId: number
) {
    const result = await pool.query(
        `
        INSERT INTO products
            (name, description, price, stock, unit, category_id)
        VALUES
            ($1, $2, $3, $4, $5, $6)
        RETURNING
            id,
            name,
            description,
            price,
            stock,
            unit,
            image_url,
            is_active,
            category_id;
        `,
        [
            name,
            description,
            price,
            stock,
            unit,
            categoryId
        ]
    );

    return result.rows[0];
}