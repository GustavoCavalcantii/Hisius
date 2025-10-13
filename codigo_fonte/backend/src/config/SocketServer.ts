import { Server } from "socket.io";
import Logger from "./Logger";
import { TokenUtils } from "../utils/TokenUtils";

export class SocketServer {
  private static io: Server;
  private static tokenUtils: TokenUtils = new TokenUtils();

  static init(httpServer: any) {
    this.io = new Server(httpServer, {
      cors: { origin: "*" },
    });

    this.io.use((socket, next) => {
      const token =
        socket.handshake.auth?.token || socket.handshake.query?.token;
      if (!token) return next(new Error("Token ausente"));

      try {
        const payload = this.tokenUtils.validateAccessToken(token);
        (socket as any).userId = payload.id;
        next();
      } catch (err: any) {
        Logger.warn("Token inválido:", err.message);
        next(new Error("Token inválido"));
      }
    });

    this.io.on("connection", (socket) => {
      const userId = (socket as any).userId;
      const room = `user:${userId}`;
      socket.join(room);
      Logger.info(`Usuário ${userId} conectado na sala ${room}`);
      socket.on("disconnect", () => {
        Logger.info(`Usuário ${userId} desconectou`);
      });
    });

    Logger.info("WebSocket inicializado");
  }

  static getIo(): Server {
    if (!this.io) throw new Error("WebSocket não inicializado");
    return this.io;
  }
}
