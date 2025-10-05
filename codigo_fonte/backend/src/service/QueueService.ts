import { RedisClientType } from "redis";
import { getRedis } from "../config/Redis";
import { ManchesterClassification } from "../enums/Queue/ManchesterClassification";
import { QueueType } from "../enums/Queue/QueueType";
import { IQueuedPatient } from "../interfaces/queue/IQueuedPatient";
import { BadRequestError } from "../utils/errors/BadResquestError";
import { PatientService } from "./PatientService";
import { UserService } from "./UserService";
import { QueueTypePT } from "../enums/Queue/QueueTypePT";
import { calculateAge, calculateScore } from "../utils/CalculateUtils";
import Patient from "../database/models/Patient";
import User from "../database/models/User";
import { parseClassification } from "../utils/Helper";
import { NotFoundError } from "../utils/errors/NotFoundError";

export class QueueService {
  private redis?: RedisClientType;
  private patientService = new PatientService();
  private userService = new UserService();

  private getPatientQueueMapKey() {
    return "patientQueueMap";
  }

  private getRedisClient(): RedisClientType {
    if (!this.redis) {
      this.redis = getRedis();
    }
    return this.redis;
  }

  private async genEnqueuedPatient(user: User, patient: Patient) {
    const redis = this.getRedisClient();

    const meta = await redis.hGetAll(`patient:${patient.id}:queueData`);

    const age = calculateAge(patient.birthDate);

    const patientOb: IQueuedPatient = {
      id: patient.id,
      name: user.name,
      age,
      gender: patient.gender,
      classification: parseClassification(meta.classification),
    };

    return patientOb;
  }

  async enqueuePatient(
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

    if (type === QueueType.TREATMENT && !classification) {
      throw new BadRequestError(
        "Classificação de risco é obrigatória para atendimento"
      );
    }

    const age = calculateAge(patient.birthDate);
    const today = new Date();

    const user = await this.userService.getUserById(patient.userId);
    if (!user) throw new BadRequestError("Usuário não encontrado");

    const queueKey = `queue:${type}`;

    await redis.zAdd(queueKey, {
      score: calculateScore(today, age, classification),
      value: patientIdStr,
    });

    await redis.hSet(patientQueueMapKey, patientIdStr, type);
    await redis.hSet(`patient:${patientIdStr}:queueData`, {
      joinedAt: today.toISOString(),
      classification: classification ?? "",
    });
  }

  async getPatientsByQueue(
    type: QueueType,
    page: number = 1,
    limit: number = 10
  ): Promise<(IQueuedPatient & { position: number })[]> {
    const redis = this.getRedisClient();
    const queueKey = `queue:${type}`;

    const total = await redis.zCard(queueKey);
    const currentPage = Math.max(page, 1);
    const start = (currentPage - 1) * limit;
    const end = Math.min(start + limit - 1, total - 1);

    if (start > total - 1) return [];

    const patientsRaw = await redis.zRange(queueKey, start, end);

    const patients = await Promise.all(
      patientsRaw.map(async (p, idx) => {
        const patient = await this.patientService.getById(Number(p));
        const user = await this.userService.getUserById(patient.userId);

        const base = await this.genEnqueuedPatient(user, patient);

        return {
          ...base,
          position: start + idx + 1,
        };
      })
    );

    return patients;
  }

  async moveToNextQueue(
    patientId: number,
    classification: ManchesterClassification
  ) {
    const patient = await this.patientService.getById(patientId);
    if (!patient) throw new BadRequestError("Paciente não encontrado");

    await this.dequeuePatient(patient.userId);
    await this.enqueuePatient(
      patient.userId,
      QueueType.TREATMENT,
      classification
    );
  }

  async getNextPatient(type: QueueType): Promise<IQueuedPatient | null> {
    const redis = this.getRedisClient();
    const queueKey = `queue:${type}`;

    const next = await redis.zPopMin(queueKey);
    if (!next) return null;

    const patientIdStr = next.value;
    const patient = await this.patientService.getById(Number(patientIdStr));
    if (!patient) {
      await redis.hDel(this.getPatientQueueMapKey(), patientIdStr);
      await redis.del(`patient:${patientIdStr}:queueData`);
      throw new NotFoundError("Paciente não encontrado");
    }

    const user = await this.userService.getUserById(patient.userId);
    if (!user) {
      await redis.hDel(this.getPatientQueueMapKey(), patientIdStr);
      await redis.del(`patient:${patientIdStr}:queueData`);
      throw new NotFoundError("Usuário não encontrado");
    }

    await redis.hDel(this.getPatientQueueMapKey(), patientIdStr);
    await redis.del(`patient:${patientIdStr}:queueData`);

    return this.genEnqueuedPatient(user, patient);
  }

  async dequeuePatient(userId: number) {
    const redis = this.getRedisClient();
    const patientQueueMapKey = this.getPatientQueueMapKey();

    const patient = await this.patientService.getByUserId(userId);
    if (!patient) throw new BadRequestError("Paciente não encontrado");

    const patientIdStr = patient.id.toString();

    const queueType = await redis.hGet(patientQueueMapKey, patientIdStr);
    if (!queueType)
      throw new BadRequestError("Paciente não está em nenhuma fila");

    const queueKey = `queue:${queueType}`;
    const metaDataKey = `patient:${patientIdStr}:queueData`;

    await redis.zRem(queueKey, patientIdStr);
    await redis.hDel(patientQueueMapKey, patientIdStr);
    await redis.del(metaDataKey);

    return queueType;
  }
}
