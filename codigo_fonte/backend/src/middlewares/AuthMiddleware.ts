import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../utils/Errors/BadResquestError";
import { ForbiddenError } from "../utils/Errors/ForbiddenError";

export async function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = getBearerToken(req);
  if (!token) return next(new BadRequestError("Token ausente"));

  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

    if (typeof payload === "string") {
      throw new BadRequestError("Token inválido");
    }

    req.user = {
      id: payload.id,
      role: payload.role,
    };
    next();
  } catch {
    next(new ForbiddenError("Token inválido"));
  }
}

function getBearerToken(req: Request): string | null {
  const header = req.headers["authorization"];
  if (!header) return null;

  const parts = header.split(" ");
  if (parts.length !== 2) return null;

  const [scheme, token] = parts;
  if (scheme !== "Bearer") return null;

  return token;
}
