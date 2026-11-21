import {Request , Response} from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {findUserByEmail} from "../models/userByEmail"
import {UserInterface} from "../types/user"

import fs from "fs";


export const verifyLogin = async (req: Request , res: Response) => {
    
    const user:UserInterface | null = await findUserByEmail(req.body.email);

    if(!user){
        return res.status(401).json({
            message: "No such user found"
        })
    }

     // 2. Verify password
    const passwordValid =  await bcrypt.compare(
      req.body.password,
      user.password_hash
    );

    if(!passwordValid){
        return res.status(401).json({
            message: "Invalid email or password"
        })
    }

    const privateKey = fs.readFileSync("./src/keys/private.pem", "utf8");


    // 3. Create access token
    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role
      },
      privateKey,
      {
        algorithm: "RS256",
        expiresIn: "1h"
      }
    );

    return res.status(200).json({
        message: "Login successful",
        token: token
    });
}

