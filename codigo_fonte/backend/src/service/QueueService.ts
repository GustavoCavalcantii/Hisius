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
import { IQueueHistoryResponse } from "../interfaces/queue/IQueueHistoryResponse";
import { AttendanceService } from "./AttendanceService";
import { ICreateAttendanceInput } from "../interfaces/attendance/ICreateAttendanceInput";
import { AttendanceStatus } from "../enums/Attendance/AttendanceStatus";
import { Destination } from "../enums/Attendance/Destination";
import { ManagerService } from "../service/ManagerService";
import QueueEventRepository from "../repositories/QueueEventRepository";

export class QueueService {
  private patientService = new PatientService();
  private userService = new UserService();
  private queueRepo = new QueueRepository();
  private reportService = new ReportService();
  private attendanceService = new AttendanceService();
  private managerService = new ManagerService();
  private queueEventRepo = new QueueEventRepository();

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
    return await this.queueRepo.getQueueLength(queueType);
  }

  private async formatQueuedPatient(
    user: IUser,
    patient: IPatient,
    position: number,
    meta: Record<string, string>,
    attendanceId?: number
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
      attendanceId: attendanceId || null,
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
    hospitalCode?: string,
    classification?: ManchesterClassification
  ) {
    await this.removePatientsOverOneDay();

    if (type == QueueType.TRIAGE) {
      const success = hospitalCode
        ? await this.managerService.checkIfCodeExists(hospitalCode)
        : false;
      if (!success) throw new BadRequestError("Código não encontrado");
    }

    const patient = await this.patientService.getPatientByUserId(userId);
    if (!patient) throw new BadRequestError("Paciente não encontrado");

    await this.ensurePatientNotInQueue(patient.id);

    if (type === QueueType.TREATMENT && !classification) {
      throw new BadRequestError(
        "Classificação de risco é obrigatória para atendimento"
      );
    }

    const age = calculateAge(patient.birthDate);
    const today = new Date();
    const score = calculateScore(today, age, classification);

    const id = uuid().toString();
    await this.queueRepo.addPatientToQueue(type, patient.id, score);
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
    const total = await this.queueRepo.getQueueLength(type);

    const patientsRaw = await this.queueRepo.getQueuePatients(
      type,
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

    await this.queueRepo.removePatientFromQueue(
      QueueType.TREATMENT,
      patient.id
    );
    await this.queueRepo.addPatientToQueue(
      QueueType.TREATMENT,
      patient.id,
      newScore
    );
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

    const position = await this.queueRepo.getPatientPosition(
      meta.type as QueueType,
      patient.id
    );

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const averageSeconds = await this.queueEventRepo.getAverageWaitTimeByQueue(
      meta.type as QueueType,
      start,
      end
    );

    const estimatedWaitMinutes = Math.round(
      (position * averageSeconds * 1000) / 60000
    );

    const patientInfo = {
      id: patient.id,
      classification: parseClassification(meta.classification) ?? null,
      roomCalled: meta.room ?? null,
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
      "",
      classification
    );
  }

  async removePatientsOverOneDay(): Promise<number> {
    const patientIds = await this.queueRepo.getAllPatientsWithQueueData();
    const now = Date.now();
    const removalPromises = [];

    for (const patientId of patientIds) {
      removalPromises.push(
        (async () => {
          const meta = await this.queueRepo.getPatientMeta(patientId);
          if (
            meta?.joinedAt &&
            now - new Date(meta.joinedAt).getTime() > 86400000
          ) {
            await this.queueRepo.removePatientFromQueue(
              meta.type as QueueType,
              patientId
            );
            await this.queueRepo.deletePatientMeta(patientId);
            if (meta.queueId) {
              await this.reportService.updateExit(meta.queueId, new Date());
            }
            return 1;
          }
          return 0;
        })()
      );
    }

    const results = await Promise.allSettled(removalPromises);
    return results.reduce(
      (count, result) =>
        result.status === "fulfilled" ? count + result.value : count,
      0
    );
  }

  async getNextPatient(
    type: QueueType,
    room: string,
    userId: number
  ): Promise<IQueuedPatient | null> {
    const patientIdStr = await this.queueRepo.getNextPatientId(type);

    if (!patientIdStr) throw new NotFoundError("Nenhum paciente na fila");

    const patientId = Number(patientIdStr);
    const position = await this.queueRepo.getPatientPosition(type, patientId);
    await this.queueRepo.setPatientStatus(patientId, QueueStatus.IN_PROGRESS);
    await this.queueRepo.removePatientFromQueue(type, patientId);
    await this.queueRepo.setPatientMeta(patientId, { room });

    const { patient, user } = await this.getPatientWithUser(patientId);
    await this.queueRepo.registerPatientCalled(type, patientId);
    await this.queueRepo.addPatientToCalledHistory(
      type,
      patientId,
      user.name,
      room
    );
    const today = new Date();

    let attendanceId = undefined;

    if (type == QueueType.TREATMENT) {
      const meta = await this.queueRepo.getPatientMeta(patientId);
      const entryDate = meta?.joinedAt ? new Date(meta.joinedAt) : new Date();

      const attendance = await this.attendanceService.create({
        userId,
        patientId,
        entryDate,
        attendanceDate: today,
        status: AttendanceStatus.DRAFT,
        priority: meta.classification || ManchesterClassification.BLUE,
        mainComplaint: "A ser preenchido",
        destination: Destination.DISCHARGE,
      } as ICreateAttendanceInput);

      if (attendance) attendanceId = attendance.id;
    }

    const queuedPatient = await this.formatQueuedPatient(
      user,
      patient,
      position,
      await this.queueRepo.getPatientMeta(patientId),
      attendanceId
    );

    await NotificationService.notifyPatientCalled(user.id, room);
    const patients = await this.queueRepo.getLastCalledPatients(type);
    await NotificationService.notifyAddInPanel(patients);

    return queuedPatient;
  }

  async getCalledPatients(
    queueType: QueueType
  ): Promise<IQueueHistoryResponse[]> {
    return await this.queueRepo.getLastCalledPatients(queueType);
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
      await this.queueRepo.removePatientFromQueue(queueType, patient.id);
    }
    await this.queueRepo.deletePatientMeta(patient.id);

    for (const queueType of queueTypes) {
      await this.queueRepo.removePatientFromHistory(queueType, patient.id);
    }
  }

  async getPatientsInRoom(
    type: QueueType,
    page: number = 1,
    limit: number = 10,
    classificationFilter?: ManchesterClassification,
    nameFilter?: string
  ): Promise<{ patients: IQueuedPatient[]; pagination: IPagination }> {
    const allPatientIds = await this.queueRepo.getAllPatientsWithQueueData();
    const filteredPatients = [];

    for (const patientId of allPatientIds) {
      const meta = await this.queueRepo.getPatientMeta(patientId);

      if (
        !meta ||
        meta.type !== type ||
        meta.status !== QueueStatus.IN_PROGRESS
      )
        continue;

      if (classificationFilter && meta.classification !== classificationFilter)
        continue;

      const { patient, user } = await this.getPatientWithUser(patientId);

      if (
        nameFilter &&
        !user.name.toLowerCase().startsWith(nameFilter.toLowerCase())
      )
        continue;

      filteredPatients.push({ patientId, meta, patient, user });
    }

    const start = page * limit;
    const end = start + limit;
    const pagePatients = filteredPatients.slice(start, end);

    const patients = await Promise.all(
      pagePatients.map(async ({ patientId, meta, patient, user }) =>
        this.formatQueuedPatient(
          user,
          patient,
          0, // Posição não se aplica para sala
          meta
        )
      )
    );

    const totalPages = Math.ceil(filteredPatients.length / limit);

    return {
      patients,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: filteredPatients.length,
        itemsPerPage: limit,
        hasNext: page < totalPages - 1,
        hasPrev: page > 0,
        nextPage: page < totalPages - 1 ? page + 1 : null,
        prevPage: page > 0 ? page - 1 : null,
      },
    };
  }

  async dequeuePatient(userId: number, exit: boolean = false) {
    const patient = await this.patientService.getPatientByUserId(userId);
    if (!patient) throw new BadRequestError("Paciente não encontrado");

    const meta = await this.queueRepo.getPatientMeta(patient.id);
    if (!meta || Object.keys(meta).length === 0)
      throw new BadRequestError("Paciente não está em nenhuma fila");

    if (!exit) await this.reportService.updateExit(meta.queueId, new Date());
    await this.queueRepo.removePatientFromQueue(
      meta.type as QueueType,
      patient.id
    );
    await this.queueRepo.deletePatientMeta(patient.id);

    return meta;
  }
}
