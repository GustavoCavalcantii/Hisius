import { PatientRepository } from "../repositories/PatientRepository";
import { PatientDto } from "../dtos/patient/PatientDto";
import { BadRequestError } from "../utils/errors/BadRequestError";

export class PatientService {
  private patientRepo = new PatientRepository();

  async getPatientByUserId(userId: number) {
    const patient = await this.patientRepo.findByUserId(userId);
    if (!patient) {
      throw new BadRequestError(
        "Perfil de paciente não encontrado para este usuário."
      );
    }
    return {
      ...patient.sanitize(),
      name: patient.user?.name,
      email: patient.user?.email,
    };
  }

  async updatePatientByUserId(userId: number, dto: PatientDto) {
    const patient = await this.patientRepo.updateByUserId(userId, dto);
    return {
      ...patient.sanitize(),
      name: patient.user?.name,
    };
  }

  async createPatient(dto: PatientDto, userId: number) {
    const patientData = { ...dto, userId };
    const patient = await this.patientRepo.create(patientData);

    if (!patient) {
      throw new BadRequestError("Erro ao criar perfil de paciente.");
    }

    return {
      ...patient.sanitize(),
      name: patient.user?.name,
    };
  }

  async getPatientById(id: number) {
    const patient = await this.patientRepo.findById(id);
    if (!patient) throw new BadRequestError("Paciente não encontrado.");

    return {
      ...patient.sanitize(),
      name: patient.user?.name,
    };
  }

  async updatePatient(id: number, dto: PatientDto) {
    const patient = await this.patientRepo.update(id, dto);
    return {
      ...patient.sanitize(),
      name: patient.user?.name,
    };
  }
}
