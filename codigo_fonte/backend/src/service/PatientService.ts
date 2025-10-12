import { PatientRepository } from "../repositories/PatientRepository";
import { PatientDto } from "../dtos/patient/PatientDto";
import { Patient } from "../database/models/Patient"; 
import { BadRequestError } from "../utils/errors/BadRequestError";

export class PatientService {
  private patientRepo = new PatientRepository();

  
  private _sanitizePatient(patient: Patient | null) {
    if (!patient) return null;
    const patientJSON = patient.toJSON();
    const { data_criacao, data_atualizacao, ...rest } = patientJSON;
    return rest;
  }

 
  async getPatientByUserId(userId: number) {
    const patient = await this.patientRepo.findByUserId(userId);
    if (!patient) {
      throw new BadRequestError("Perfil de paciente não encontrado para este usuário.");
    }
    return this._sanitizePatient(patient);
  }

  
  async updatePatientByUserId(userId: number, dto: PatientDto) {
    const updatedPatient = await this.patientRepo.updateByUserId(userId, dto);
    return this._sanitizePatient(updatedPatient);
  }

  
  
  async createPatient(dto: PatientDto, userId: number) {
    const patientData = { ...dto, userId };
    const patient = await this.patientRepo.create(patientData);
    return this._sanitizePatient(patient);
  }

  async getPatientById(id: number) {
    const patient = await this.patientRepo.findById(id);
    if (!patient) {
      throw new BadRequestError("Paciente não encontrado.");
    }
    return this._sanitizePatient(patient);
  }

 
  async updatePatient(id: number, dto: PatientDto) {
    const updatedPatient = await this.patientRepo.update(id, dto);
    return this._sanitizePatient(updatedPatient);
  }
}