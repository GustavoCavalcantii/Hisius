import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../utils/errors/BadResquestError";
import { ForbiddenError } from "../utils/errors/ForbiddenError";
import { TokenUtils } from "../utils/TokenUtils";

var tokenUtils = new TokenUtils();

export async function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = getBearerToken(req);
  if (!token) return next(new BadRequestError("Token ausente"));

  try {
    const payload = tokenUtils.validateAcessToken(token);

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
