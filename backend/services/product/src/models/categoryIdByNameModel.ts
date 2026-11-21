import pool from "../db/pool"



export async function getCategoryIdByName(
    category: string
) {
    const result = await pool.query(
        `
        SELECT id
        FROM categories
        WHERE LOWER(name) = LOWER(TRIM($1))
        LIMIT 1;
        `,
        [category]
    );

    return result.rows[0]?.id;
}