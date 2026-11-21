import  pool  from "../db/pool";
import {UserInterface} from "../types/user";


export async function findUserByEmail(
  email: string
): Promise<UserInterface | null> {
  const result = await pool.query(
    `SELECT id, name, email, password_hash, role
     FROM users
     WHERE email = $1`,
    [email]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
}