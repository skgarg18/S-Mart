import pool from "../db/pool";


export async function getProductSummaryModel() {
    const result = await pool.query(`
        SELECT
            c.name AS category,
            COUNT(p.id) AS product_count
        FROM categories c
        LEFT JOIN products p
            ON p.category_id = c.id
            AND p.is_active = true
        GROUP BY c.id, c.name
        ORDER BY c.name;
    `);

    return result.rows;
}