import {Patient} from "../database/models/Patient";
import { PatientDto } from "../dtos/patient/PatientDto";
import { BadRequestError } from "../utils/errors/BadRequestError";

export class PatientRepository {
  async findById(id: number) {
    return Patient.findOne({ where: { id } });
  }

  async create(data: Partial<PatientDto> & { userId: number }) {
    return Patient.create(data);
  }

  async update(id: number, data: Partial<PatientDto>) {
    const patient = await this.findById(id);
    if (!patient) throw new BadRequestError("Paciente não encontrado.");
    await patient.update(data);
    return patient;
  }

  async delete(id: number): Promise<void> {
    const patient = await this.findById(id);
    if (!patient) {
      throw new BadRequestError("Paciente não encontrado para deleção.");
    }
    await patient.destroy();
  }
}

