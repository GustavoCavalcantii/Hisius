import { SocketServer } from "../config/SocketServer";
import Logger from "../config/Logger";

export class NotificationGateway {
  static emitToUser(userId: number, event: string, data: any) {
    try {
      SocketServer.getIo().to(`user:${userId}`).emit(event, data);
    } catch (err: any) {
      Logger.error("Falha ao emitir notificação:", err);
    }
  }

  static emitToAdmins(event: string, data: any) {
    try {
      SocketServer.getIo().to("admin:panel").emit(event, data);
    } catch (err: any) {
      Logger.error("Falha ao emitir para admins:", err);
    }
  }

  static isUserOnline(userId: number): boolean {
    try {
      const room = SocketServer.getIo().sockets.adapter.rooms.get(
        `user:${userId}`
      );
      return !!room && room.size > 0;
    } catch (err: any) {
      return false;
    }
  }
}
