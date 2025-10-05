import { RedisClientType } from "redis";
import { getRedis } from "../config/Redis";
import { ManchesterClassification } from "../enums/Queue/ManchesterClassification";
import { QueueType } from "../enums/Queue/QueueType";
import { IQueuedPatient } from "../interfaces/queue/IQueuedPatient";
import { BadRequestError } from "../utils/errors/BadResquestError";
import { PatientService } from "./PatientService";
import { UserService } from "./UserService";

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

  private getPatientSetKey() {
    return "patientsInQueue";
  }

  async enqueuedPatient(
    userId: number,
    type: QueueType,
    classification?: ManchesterClassification
  ) {
    const redis = this.getRedisClient();
    const patient = await this.patientService.getByUserId(userId);

    if (!patient) throw new BadRequestError("Paciente não encontrado");

    const isInQueue = await redis.sIsMember(
      this.getPatientSetKey(),
      patient.id.toString()
    );

    if (isInQueue) throw new BadRequestError("Paciente já está em uma fila");

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

    await redis.sAdd(this.getPatientSetKey(), patient.id.toString());
  }
}
