import { Socket } from "socket.io";
import Logger from "../config/Logger";
import { TokenType } from "../enums/Token/TokenTypes";
import { BadRequestError } from "../utils/errors/BadRequestError";
import { TokenUtils } from "../utils/TokenUtils";
import { ForbiddenError } from "../utils/errors/ForbiddenError";

var tokenUtils = new TokenUtils();

export function GatewayMiddleware(socket: Socket, next: any) {
  socket.data.user = null;

  try {
    const token = extractTokenFromSocket(socket);

    if (!token) {
      Logger.warn("Tentativa de conexão não autorizada", {
        ip: socket.handshake.address,
        userAgent: socket.handshake.headers["user-agent"],
      });
      return next(new ForbiddenError("Token de autenticação necessário"));
    }

    const payload = validateToken(token);

    socket.data.user = {
      id: payload.id,
      role: payload.role,
      email: payload.email,
      name: payload.name,
    };

    Logger.info(`Socket autenticado: Usuário ${payload.id} (${payload.role})`);

    next();
  } catch (error: any) {
    handleAuthError(error, next);
  }
}

function extractTokenFromSocket(socket: Socket): string | null {
  const headerToken =
    socket.handshake.headers.authorization?.replace("Bearer ", "") || null;

  if (headerToken) {
    return headerToken;
  }

  const authToken =
    socket.handshake.auth.authorization?.replace("Bearer ", "") || null;

  return authToken;
}
function validateToken(token: string) {
  const payload = tokenUtils.validateAccessToken(token);

  if (payload.type !== TokenType.AUTH) {
    throw new BadRequestError("Tipo de token inválido para autenticação");
  }

  return payload;
}

function handleAuthError(error: any, next: any) {
  Logger.error("Erro na autenticação do socket:", {
    error: error.message,
    type: error.name,
  });

  if (error.name === "TokenExpiredError") {
    return next(new ForbiddenError("Sessão expirada. Faça login novamente."));
  }

  if (error.name === "JsonWebTokenError") {
    return next(new ForbiddenError("Token de autenticação inválido."));
  }

  if (error instanceof BadRequestError || error instanceof ForbiddenError) {
    return next(error);
  }

  return next(new ForbiddenError("Falha na autenticação"));
}
