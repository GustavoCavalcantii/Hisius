import { PatientRepository } from "../repositories/PatientRepository";
import { PatientDto } from "../dtos/patient/PatientDto";
import { Patient } from "../database/models/Patient";
import { BadRequestError } from "../utils/errors/BadRequestError";
import { calculateAge } from "../utils/CalculateUtils";
import { UserRepository } from "../repositories/UserRepository";
import { IPatient } from "../interfaces/patient/IPatient";

export class PatientService {
  private patientRepo = new PatientRepository();
  private userRepo = new UserRepository();

  private async _sanitizePatient(
    patient: Patient | null
  ): Promise<IPatient | null> {
    if (!patient) return null;

    const age = calculateAge(patient.birthDate);
    const user = await this.userRepo.findById(patient.userId);

    if (!user) throw new BadRequestError("Usuario não encontrado");

    const patientJSON = patient.toJSON();
    const { data_criacao, data_atualizacao, usuario_id, ...rest } =
      patientJSON;

    return {
      ...rest,
      age: age ?? null,
      name: user.name ?? "",
    } as IPatient;
  }

  async getPatientByUserId(userId: number) {
    const patient = await this.patientRepo.findByUserId(userId);
    if (!patient) {
      throw new BadRequestError(
        "Perfil de paciente não encontrado para este usuário."
      );
    }
    return await this._sanitizePatient(patient);
  }

  async updatePatientByUserId(userId: number, dto: PatientDto) {
    const updatedPatient = await this.patientRepo.updateByUserId(userId, dto);
    return await this._sanitizePatient(updatedPatient);
  }

  async createPatient(dto: PatientDto, userId: number) {
    const patientData = { ...dto, userId };
    const patient = await this.patientRepo.create(patientData);
    return await this._sanitizePatient(patient);
  }

  async getPatientById(id: number) {
    const patient = await this.patientRepo.findById(id);
    if (!patient) {
      throw new BadRequestError("Paciente não encontrado.");
    }
    return await this._sanitizePatient(patient);
  }

  async updatePatient(id: number, dto: PatientDto) {
    const updatedPatient = await this.patientRepo.update(id, dto);
    return await this._sanitizePatient(updatedPatient);
  }
}
