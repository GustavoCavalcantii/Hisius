import { Server } from "socket.io";
import Logger from "./Logger";
import { GatewayMiddleware } from "../middlewares/GatewayMiddleware";
import { UserRole } from "../enums/User/UserRole";

export class SocketServer {
  private static io: Server;

  static init(httpServer: any) {
    this.io = new Server(httpServer, { cors: { origin: "*" } });
    this.io.use(GatewayMiddleware);

    this.io.on("connection", (socket) => {
      const user = socket.data.user;
      if (!user) return socket.disconnect();

      socket.join(`user:${user.id}`);
      if (user.role === UserRole.ADMIN) socket.join("admin:panel");

      Logger.info(`Usuário ${user.id} (${user.role}) conectado`);

      socket.on("disconnect", () => {
        Logger.info(`Usuário ${user.id} desconectou`);
      });
    });

    Logger.info("WebSocket inicializado");
  }

  static getIo(): Server {
    if (!this.io) throw new Error("WebSocket não inicializado");
    return this.io;
  }
}
