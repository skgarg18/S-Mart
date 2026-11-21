import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import fs from "fs";

import { JwtPayload } from "../types/jwtTokenInterface";
const publicKey = fs.readFileSync(
    "./src/keys/public.pem",
    "utf8"
);

export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Authentication required"
        });
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded : JwtPayload  = jwt.verify(
            token,
            publicKey,
            {
                algorithms: ["RS256"]
            }
        );

        req.user = decoded;

        // Token is valid
        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};



export const requireAdmin = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // console.log(req); // Debugging line

    if (req.user?.role !== "ADMIN") {
        return res.status(403).json({
            message: "Admin access required"
        });
    }

    next();
};