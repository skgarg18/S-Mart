import {
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import fs from "fs";

import { JwtPayload } from "./types/jwtTokenInterface.js";

const publicKey = fs.readFileSync(
    "./src/keys/public.pem",
    "utf8"
);

@Injectable()
export class AuthenticateMiddleware implements NestMiddleware {

  use(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: 'Authentication required',
      });
    }

    const token = authHeader.split(' ')[1];

    try {

      const decoded: JwtPayload = jwt.verify(
        token,
        publicKey,
        {
          algorithms: ['RS256'],
        },
      ) as JwtPayload;

      req.user = decoded;

      next();

    } catch (error) {

      return res.status(401).json({
        message: 'Invalid or expired token',
      });

    }
  }
}






@Injectable()
export class RequireAdminMiddleware implements NestMiddleware {

  use(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {

    if (req.user?.role !== 'ADMIN') {
      return res.status(403).json({
        message: 'Admin access required',
      });
    }

    next();
  }
}