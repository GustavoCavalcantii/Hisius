import { NotificationGateway } from "../gateways/NotificationGateway";
import admin from "firebase-admin";
import serviceAccount from "../config/firebase/serviceAccountKey.json";
import Logger from "../config/Logger";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export class NotificationService {
  static async notifyPatientCalled(
    userId: number,
    room: string,
    fcmToken?: string
  ) {
    const messageText = `Você foi chamado! Sua sala é: ${room}`;

    if (NotificationGateway.isUserOnline(userId)) {
      NotificationGateway.emitToUser(userId, "paciente-chamado", {
        message: messageText,
      });
      return;
    }

    if (fcmToken) {
      const message = {
        token: fcmToken,
        notification: {
          title: "Paciente chamado!",
          body: messageText,
        },
        data: { room },
      };

      try {
        await admin.messaging().send(message);
        Logger.info(
          `Notificação FCM enviada para usuário ${userId} na sala ${room}`
        );
      } catch (err) {
        Logger.error("Erro ao enviar notificação FCM:", err);
      }
    }
  }
}
