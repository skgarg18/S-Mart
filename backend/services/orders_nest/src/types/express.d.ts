import { JwtPayload } from './jwtTokenInterface';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export {};