import pool from "../db/pool";

export async function getOrderSummaryModel() {
    const result = await pool.query(`
        SELECT
            COUNT(*) AS total_orders,
            COALESCE(SUM(total), 0) AS total_amount
        FROM orders;
    `);

    return result.rows[0];
}