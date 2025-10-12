import { Request } from "express";
import { UserRole } from "../../enums/User/UserRole";

declare global {
  namespace Express {
    interface Request {
      user?: { id: number; role?: UserRole; email?: string };
    }
  }
}
