import {UserInterface} from "../types/user";
import pool from "../db/pool";

import { findUserByEmail } from "./userByEmail";

import crypto from "crypto";
import bcrypt from "bcrypt";

function generatePassword(length = 12) {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
        "abcdefghijklmnopqrstuvwxyz" +
        "0123456789" +
        "!@#$%^&*";

    let password = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = crypto.randomInt(0, characters.length);
        password += characters[randomIndex];
    }

    return password;
}

export const createUser = async (
  name: string,
  email: string,
  role: "USER" | "ADMIN",
  password?: string|null,
)=> {

    try {    
    
        const user = await findUserByEmail(email);
        
        if(user){
            throw new Error("User with this email already exists");
        }

        if(!password){
            password = generatePassword();
        }

        const passwordHash = await bcrypt.hash(password, 10);


        const result = await pool.query(
        `INSERT INTO users (
            name,
            email,
            password_hash,
            role
         )
         VALUES ($1, $2, $3, $4)
         RETURNING
            id,
            name,
            email,
            password_hash,
            role`,
        [name, email, passwordHash, role]
      );

      return {
        id: result.rows[0].id,
        name: result.rows[0].name,
        email: result.rows[0].email,
        password: password,
        role: result.rows[0].role
      }

    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
};