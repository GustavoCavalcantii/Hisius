import rateLimit from "express-rate-limit";
import { Request, Response, NextFunction } from "express";
import { TooManyRequest } from "../utils/Errors/TooManyRequest";

export const Limiter = rateLimit({
  windowMs: 15 * 60 * 60 , // 15 minutos
  max: 7,
  message: "Muitas requisições! Tente novamente mais tarde.",
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: Request): string => {
    const ip = req.headers["x-forwarded-for"];
    if (typeof ip === "string") return ip;
    if (Array.isArray(ip)) return ip[0];
    return req.socket.remoteAddress || "unknown";
  },
  handler: (req: Request, res: Response, next: NextFunction) => {
    throw new TooManyRequest("Muitas requisições. Tente novamente mais tarde.");
  },
});
