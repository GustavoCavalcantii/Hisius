import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../utils/errors/BadRequestError";
import { TokenUtils } from "../utils/TokenUtils";
import { TokenType } from "../enums/Token/TokenTypes";
import { ForbiddenError } from "../utils/errors/ForbiddenError";

var tokenUtils = new TokenUtils();

export async function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = getBearerToken(req);
  if (!token) return next(new BadRequestError("Token ausente"));

  try {
    const payload = tokenUtils.validateAccessToken(token);

    if (payload.type !== TokenType.AUTH) {
      throw new BadRequestError("Token inválido");
    }

    req.user = {
      id: payload.id,
      role: payload.role,
    };
    next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
     return next(new ForbiddenError("Token expirado"));
    }
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
