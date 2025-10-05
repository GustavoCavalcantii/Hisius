import { RedisClientType } from "redis";
import { getRedis } from "../config/Redis";
import { ManchesterClassification } from "../enums/Queue/ManchesterClassification";
import { QueueType } from "../enums/Queue/QueueType";
import { IQueuedPatient } from "../interfaces/queue/IQueuedPatient";
import { BadRequestError } from "../utils/errors/BadResquestError";
import { PatientService } from "./PatientService";
import { UserService } from "./UserService";
import { QueueTypePT } from "../enums/Queue/QueueTypePT";

export class QueueService {
  private redis?: RedisClientType;
  private patientService = new PatientService();
  private userService = new UserService();

  private getRedisClient(): RedisClientType {
    if (!this.redis) {
      this.redis = getRedis();
    }
    return this.redis;
  }

  private getPatientQueueMapKey() {
    return "patientQueueMap";
  }

  async enqueuedPatient(
    userId: number,
    type: QueueType,
    classification?: ManchesterClassification
  ) {
    const redis = this.getRedisClient();
    const patient = await this.patientService.getByUserId(userId);

    if (!patient) throw new BadRequestError("Paciente não encontrado");

    const patientIdStr = patient.id.toString();
    const patientQueueMapKey = this.getPatientQueueMapKey();

    const existingQueue = await redis.hGet(patientQueueMapKey, patientIdStr);

    if (existingQueue) {
      const queuePT = QueueTypePT[existingQueue as QueueType] ?? existingQueue;
      throw new BadRequestError(`Paciente já está na fila ${queuePT}`);
    }

    const birthDate = patient.birthDate;
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age--;

    const user = await this.userService.getUserById(patient.userId);
    if (!user) throw new BadRequestError("Usuário não encontrado");

    const enqueuedPatient: IQueuedPatient = {
      id: patient.id,
      name: user.name,
      age: age,
      joinedAt: today,
      classification,
    };

    await redis.rPush(
      `queue:${type}`,
      JSON.stringify({
        ...enqueuedPatient,
        joinedAt: enqueuedPatient.joinedAt.toISOString(),
      })
    );

    await redis.hSet(patientQueueMapKey, patientIdStr, type);
  }

  async getPatientsByQueue(
    type: QueueType,
    page: number = 1,
    limit: number = 10
  ): Promise<IQueuedPatient[]> {
    const start = (page - 1) * limit;
    const end = start + limit - 1;

    const redis = this.getRedisClient();
    const queuedPatientsRaw = await redis.lRange(`queue:${type}`, start, end);

    const queuedPatients: IQueuedPatient[] = queuedPatientsRaw.map((p) => {
      const parsed = JSON.parse(p);
      return {
        ...parsed,
        joinedAt: new Date(parsed.joinedAt),
      };
    });

    return queuedPatients;
  }

  async dequeuePatient(userId: number) {
    const redis = this.getRedisClient();
    const patientQueueMapKey = this.getPatientQueueMapKey();

    const patient = await this.patientService.getByUserId(userId);
    if (!patient) throw new BadRequestError("Paciente não encontrado");

    const patientIdStr = patient.id.toString();

    const queueType = await redis.hGet(patientQueueMapKey, patientIdStr);

    if (!queueType) {
      throw new BadRequestError("Paciente não está em nenhuma fila");
    }

    const queueKey = `queue:${queueType}`;

    const list = await redis.lRange(queueKey, 0, -1);
    const index = list.findIndex(
      (p) => JSON.parse(p).id.toString() === patientIdStr
    );

    if (index === -1) {
      await redis.hDel(patientQueueMapKey, patientIdStr);
      throw new BadRequestError("Paciente não encontrado na fila");
    }

    await redis.lSet(queueKey, index, "__TO_REMOVE__");
    await redis.lRem(queueKey, 0, "__TO_REMOVE__");

    await redis.hDel(patientQueueMapKey, patientIdStr);

    return queueType;
  }
}
