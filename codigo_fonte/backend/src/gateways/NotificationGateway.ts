import { SocketServer } from "../config/SocketServer";
import Logger from "../config/Logger";

export class NotificationGateway {
  static emitToUser(userId: number, event: string, data: any) {
    try {
      const io = SocketServer.getIo();
      const room = `user:${userId}`;
      Logger.info(`Emitindo evento '${event}' para ${room}`, data);
      io.to(room).emit(event, data);
    } catch (err: any) {
      Logger.error("Falha ao emitir notificação:", err);
    }
  }

  static isUserOnline(userId: number): boolean {
    const io = SocketServer.getIo();
    const room = io.sockets.adapter.rooms.get(`user:${userId}`);
    return !!room && room.size > 0;
  }
}
