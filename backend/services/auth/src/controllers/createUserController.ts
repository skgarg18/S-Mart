import {Request , Response} from "express";

import {findUserByEmail} from "../models/userByEmail"
import {createUser as createUserModel} from "../models/addUser"

import {CreateUserRequestInterface} from "../types/createUser"

export const createUser = async (req: Request<{} , {} , CreateUserRequestInterface> , res: Response) => {
    // Implement user creation logic here
    // For example, you can validate the request body, hash the password, and save the user to the database 

    try {

        const {name, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({
                message: "Email id Already exists"
            });
        }

        // Create the user
        const newUser = await createUserModel(name, email, "USER", password);

        return res.status(201).json({
            message: "User created successfully",
            user: newUser
        });

        
    } catch (error) {
        console.log("Error creating user:", error);
        return res.status(500).json({
            message: "Error creating user",
            error: error.message
        });
    }
}