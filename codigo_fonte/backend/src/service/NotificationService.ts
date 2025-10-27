import { NotificationGateway } from "../gateways/NotificationGateway";
import admin from "firebase-admin";
import serviceAccount from "../config/firebase/serviceAccountKey.json";
import Logger from "../config/Logger";
import { IQueueHistoryResponse } from "../interfaces/queue/IQueueHistoryResponse";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});
export class NotificationService {
  static async notifyAddInPanel(patients: IQueueHistoryResponse[]) {
    NotificationGateway.emitToAdmins("paciente-chamado", patients);
  }

  static async notifyPatientCalled(
    userId: number,
    room: string,
    fcmToken?: string
  ) {
    const messageText = `Você foi chamado! Sala: ${room}`;

    if (NotificationGateway.isUserOnline(userId)) {
      NotificationGateway.emitToUser(userId, "paciente-chamado", {
        message: messageText,
        room,
      });
      return;
    }

    if (fcmToken) {
      const message = {
        token: fcmToken,
        notification: { title: "Paciente chamado!", body: messageText },
        data: { room },
      };

      try {
        await admin.messaging().send(message);
      } catch (err) {
        Logger.error("Erro FCM:", err);
      }
    }
  }
}
