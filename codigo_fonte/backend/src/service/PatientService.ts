import { PatientRepository } from "../repositories/PatientRepository";
import { PatientDto } from "../dtos/patient/PatientDto";
import Patient from "../database/models/Patient";

export class PatientService {
  private patientRepo = new PatientRepository();

  private _sanitizePatient(patient: Patient | null) {
    if (!patient) return null;
    
    const patientJSON = patient.toJSON();
    const { data_criacao, data_atualizacao, ...rest } = patientJSON;
    return rest;
  }

  async getPatientById(id: number) {
    const patient = await this.patientRepo.findById(id);
    if (!patient) throw new Error("Paciente não encontrado");
    return this._sanitizePatient(patient);
  }

 
  async createPatient(dto: PatientDto, userId: number) {
    const patientData = {
      userId: userId,
      nome: dto.nome,
      cpf: dto.cpf,
      phone: dto.telefone, 
      gender: dto.sexo,       
      birthDate: dto.data_nascimento 
    };

    const patient = await this.patientRepo.create(patientData);
    
    return this._sanitizePatient(patient);
  }

  async updatePatient(id: number, dto: PatientDto) {
    const patientDataToUpdate = {
        nome: dto.nome,
        cpf: dto.cpf,
        phone: dto.telefone,
        gender: dto.sexo,
        birthDate: dto.data_nascimento
    };

    const updatedPatient = await this.patientRepo.update(id, patientDataToUpdate);
    return this._sanitizePatient(updatedPatient);
  }

  async deletePatient(id: number): Promise<void> {
    return await this.patientRepo.delete(id);
  }
}