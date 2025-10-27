import { ManchesterClassification } from "../enums/Queue/ManchesterClassification";
import { QueueType } from "../enums/Queue/QueueType";
import { IQueuedPatient } from "../interfaces/queue/IQueuedPatient";
import { BadRequestError } from "../utils/errors/BadRequestError";
import { NotFoundError } from "../utils/errors/NotFoundError";
import { PatientService } from "./PatientService";
import { UserService } from "./UserService";
import { QueueTypePT } from "../enums/Queue/QueueTypePT";
import { calculateAge, calculateScore } from "../utils/CalculateUtils";
import { parseClassification } from "../utils/Helper";
import { QueueRepository } from "../repositories/QueueRepository";
import { QueueStatus } from "../enums/Queue/QueueStatus";
import { NotificationService } from "./NotificationService";
import { v4 as uuid } from "uuid";
import { ReportService } from "./ReportService";
import { ICreateQueueEventInput } from "../interfaces/queue/ICreateQueueEventInput";
import { IPatient } from "../interfaces/patient/IPatient";
import { IUser } from "../interfaces/user/IUser";
import { IPagination } from "../interfaces/queue/IPagination";

export class QueueService {
  private patientService = new PatientService();
  private userService = new UserService();
  private queueRepo = new QueueRepository();
  private reportService = new ReportService();

  private async getPatientWithUser(
    patientId: number
  ): Promise<{ patient: IPatient; user: IUser }> {
    const patient = await this.patientService.getPatientById(patientId);
    if (!patient) throw new NotFoundError("Paciente não encontrado");

    const user = await this.userService.getUserById(patient.userId);
    if (!user) throw new NotFoundError("Usuário não encontrado");

    return { patient, user };
  }

  async getQueueCount(queueType: QueueType): Promise<number> {
    const queueKey = `queue:${queueType}`;
    return await this.queueRepo.getQueueLength(queueKey);
  }

  private async formatQueuedPatient(
    user: IUser,
    patient: IPatient,
    position: number,
    meta: Record<string, string>
  ): Promise<IQueuedPatient> {
    return {
      id: patient.id,
      name: user.name,
      birthDate: patient.birthDate,
      cnsNumber: patient.cnsNumber,
      motherName: patient.motherName,
      dateHourAttendance: meta.joinedAt,
      age: calculateAge(patient.birthDate),
      gender: patient.gender,
      position,
      classification: parseClassification(meta.classification) || null,
    } as IQueuedPatient;
  }

  private async ensurePatientNotInQueue(patientId: number) {
    const exists = await this.queueRepo.patientExistsInQueue(patientId);
    if (exists) {
      const meta = await this.queueRepo.getPatientMeta(patientId);
      const queueName = QueueTypePT[meta.type as QueueType] || meta.type;
      throw new BadRequestError(`Paciente já está na fila ${queueName}`);
    }
  }

  async enqueuePatient(
    userId: number,
    type: QueueType,
    classification?: ManchesterClassification
  ) {
    const patient = await this.patientService.getPatientByUserId(userId);
    if (!patient) throw new BadRequestError("Paciente não encontrado");

    console.log(patient);

    await this.ensurePatientNotInQueue(patient.id);

    if (type === QueueType.TREATMENT && !classification) {
      throw new BadRequestError(
        "Classificação de risco é obrigatória para atendimento"
      );
    }

    const { user } = await this.getPatientWithUser(patient.id);
    const age = calculateAge(patient.birthDate);
    const today = new Date();
    const score = calculateScore(today, age, classification);

    const queueKey = `queue:${type}`;
    const id = uuid().toString();
    await this.queueRepo.addPatientToQueue(queueKey, patient.id, score);
    await this.queueRepo.setPatientMeta(patient.id, {
      queueId: id,
      joinedAt: today.toISOString(),
      ...(classification ? { classification } : {}),
      type,
      status: QueueStatus.WAITING,
    });

    const data: ICreateQueueEventInput = {
      patientId: patient.id,
      queueId: id,
      enteredAt: new Date(),
    };

    this.reportService.createEvent(type, data);
  }

  async getPatientsByQueue(
    type: QueueType,
    page: number = 1,
    limit: number = 10,
    classificationFilter?: ManchesterClassification,
    nameFilter?: string
  ): Promise<{ patients: IQueuedPatient[]; pagination: IPagination }> {
    const queueKey = `queue:${type}`;
    const total = await this.queueRepo.getQueueLength(queueKey);

    const patientsRaw = await this.queueRepo.getQueuePatients(
      queueKey,
      0,
      total - 1
    );

    const filteredPatients: Array<{
      patientId: number;
      meta: Record<string, string>;
      patient: IPatient;
      user: IUser;
    }> = [];

    for (const patientIdStr of patientsRaw) {
      const patientId = Number(patientIdStr);
      const meta = await this.queueRepo.getPatientMeta(patientId);
      if (!meta || Object.keys(meta).length === 0) continue;

      if (classificationFilter) {
        const patientClassification = parseClassification(
          meta.classification ?? undefined
        );
        if (
          !patientClassification ||
          patientClassification !== classificationFilter
        )
          continue;
      }

      let patientData: { patient: IPatient; user: IUser } | null = null;
      if (nameFilter) {
        patientData = await this.getPatientWithUser(patientId);
        const userName = patientData.user.name.toLowerCase();
        if (!userName.startsWith(nameFilter.toLowerCase())) continue;
      }

      if (!patientData) {
        patientData = await this.getPatientWithUser(patientId);
      }

      filteredPatients.push({
        patientId,
        meta,
        patient: patientData.patient,
        user: patientData.user,
      });
    }

    const currentPage = Math.max(page, 0);
    const start = currentPage * limit;
    const end = start + limit;

    const pagePatients = filteredPatients.slice(start, end);

    const patients = await Promise.all(
      pagePatients.map(async ({ patientId, meta, patient, user }) => {
        const base = await this.formatQueuedPatient(
          user,
          patient,
          patientsRaw.indexOf(patientId.toString()) + 1,
          meta
        );
        return base;
      })
    );

    const totalPages = Math.ceil(filteredPatients.length / limit);
    const hasNext = currentPage < totalPages - 1;
    const hasPrev = currentPage > 0;

    return {
      patients,
      pagination: {
        currentPage,
        totalPages,
        totalItems: filteredPatients.length,
        itemsPerPage: limit,
        hasNext,
        hasPrev,
        nextPage: hasNext ? currentPage + 1 : null,
        prevPage: hasPrev ? currentPage - 1 : null,
      },
    };
  }

  async updateClassification(
    patientId: number,
    newClassification: ManchesterClassification
  ) {
    const { patient } = await this.getPatientWithUser(patientId);
    const meta = await this.queueRepo.getPatientMeta(patient.id);

    if (!meta || Object.keys(meta).length === 0)
      throw new BadRequestError("Paciente não está em nenhuma fila");

    if (meta.type !== QueueType.TREATMENT)
      throw new BadRequestError("Paciente não está na fila de tratamento");

    if (meta.classification === newClassification)
      throw new BadRequestError(
        "A nova classificação de risco deve ser diferente da classificação atual."
      );

    const age = calculateAge(patient.birthDate);
    const newScore = calculateScore(
      new Date(meta.joinedAt),
      age,
      newClassification
    );
    const queueKey = `queue:${QueueType.TREATMENT}`;

    await this.queueRepo.removePatientFromQueue(queueKey, patient.id);
    await this.queueRepo.addPatientToQueue(queueKey, patient.id, newScore);
    await this.queueRepo.setPatientMeta(patient.id, {
      classification: newClassification,
    });

    return { patientId: patient.id, classification: newClassification };
  }

  async getPatientInfo(userId: number) {
    const patient = await this.patientService.getPatientByUserId(userId);
    if (!patient) throw new BadRequestError("Paciente não encontrado");

    const meta = await this.queueRepo.getPatientMeta(patient.id);
    if (!meta || Object.keys(meta).length === 0)
      throw new BadRequestError("Paciente não está em nenhuma fila");

    const queueKey = `queue:${meta.type}`;

    const position = await this.queueRepo.getPatientPosition(
      queueKey,
      patient.id
    );

    const historyKey = `queue:history:${meta.type}`;
    const lastTimestamps = (
      await this.queueRepo.getLastTimestamps(historyKey, 10)
    ).map((t: any) => Number(t));

    let averageTime = 10 * 60 * 1000;
    if (lastTimestamps.length >= 2) {
      const diffs = [];
      for (let i = 1; i < lastTimestamps.length; i++) {
        const diff = lastTimestamps[i] - lastTimestamps[i - 1];
        if (diff > 0) diffs.push(diff);
      }
      if (diffs.length > 0) {
        averageTime = diffs.reduce((a, b) => a + b, 0) / diffs.length;
      }
    }

    const estimatedWaitMinutes = Math.round((position * averageTime) / 60000);

    const patientInfo: {
      id: number;
      classification: ManchesterClassification | null;
      estimatedWaitMinutes: number;
    } = {
      id: patient.id,
      classification: parseClassification(meta.classification) ?? null,
      estimatedWaitMinutes: estimatedWaitMinutes,
    };

    return patientInfo;
  }

  async moveToTreatment(
    patientId: number,
    classification: ManchesterClassification
  ) {
    const { patient } = await this.getPatientWithUser(patientId);
    const meta = await this.queueRepo.getPatientMeta(patient.id);

    if (!meta || Object.keys(meta).length === 0)
      throw new BadRequestError("Paciente não está em nenhuma fila");

    if (meta.status !== QueueStatus.IN_PROGRESS)
      throw new BadRequestError(
        "O paciente ainda não foi chamado para a triagem."
      );

    if (meta.type === QueueType.TREATMENT)
      throw new BadRequestError("Paciente já está na fila de atendimento");

    await this.dequeuePatient(patient.userId);
    await this.enqueuePatient(
      patient.userId,
      QueueType.TREATMENT,
      classification
    );
  }

  async getNextPatient(
    type: QueueType,
    room: string
  ): Promise<IQueuedPatient | null> {
    const queueKey = `queue:${type}`;
    const patientIdStr = await this.queueRepo.getNextPatientId(queueKey);

    if (!patientIdStr) throw new NotFoundError("Nenhum paciente na fila");

    const patientId = Number(patientIdStr);
    const position = await this.queueRepo.getPatientPosition(
      queueKey,
      patientId
    );
    await this.queueRepo.setPatientStatus(patientId, QueueStatus.IN_PROGRESS);
    await this.queueRepo.removePatientFromQueue(queueKey, patientId);

    const { patient, user } = await this.getPatientWithUser(patientId);
    await this.queueRepo.registerPatientCalled(type, patient.id);

    const queuedPatient = await this.formatQueuedPatient(
      user,
      patient,
      position,
      await this.queueRepo.getPatientMeta(patientId)
    );

    await NotificationService.notifyPatientCalled(user.id, room);

    return queuedPatient;
  }

  async finishTreatment(patientId: number) {
    const { patient } = await this.getPatientWithUser(patientId);

    const meta = await this.queueRepo.getPatientMeta(patient.id);
    const wasInQueue = meta && Object.keys(meta).length > 0;

    if (!wasInQueue)
      throw new BadRequestError("Paciente não está em nenhuma fila.");

    if (meta.status !== QueueStatus.IN_PROGRESS)
      throw new BadRequestError(
        "O paciente ainda não foi chamado para o atendimento."
      );

    const queueTypes = Object.values(QueueType);

    await this.reportService.updateExit(meta.queueId, new Date());

    for (const queueType of queueTypes) {
      const queueKey = `queue:${queueType}`;
      await this.queueRepo.removePatientFromQueue(queueKey, patient.id);
    }
    await this.queueRepo.deletePatientMeta(patient.id);

    for (const queueType of queueTypes) {
      const historyKey = `queue:history:${queueType}`;
      await this.queueRepo.removePatientFromHistory(historyKey, patient.id);
    }
  }

  async dequeuePatient(userId: number, exit: boolean = false) {
    const patient = await this.patientService.getPatientByUserId(userId);
    if (!patient) throw new BadRequestError("Paciente não encontrado");

    const meta = await this.queueRepo.getPatientMeta(patient.id);
    if (!meta || Object.keys(meta).length === 0)
      throw new BadRequestError("Paciente não está em nenhuma fila");

    if (!exit) await this.reportService.updateExit(meta.queueId, new Date());
    const queueKey = `queue:${meta.type}`;
    await this.queueRepo.removePatientFromQueue(queueKey, patient.id);
    await this.queueRepo.deletePatientMeta(patient.id);

    return meta;
  }
}
