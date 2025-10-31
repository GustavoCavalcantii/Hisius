import { Patient } from "../database/models/Patient";
import User from "../database/models/User";
import { PatientDto } from "../dtos/patient/PatientDto";
import { BadRequestError } from "../utils/errors/BadRequestError";

export class PatientRepository {
  async findById(id: number) {
    return Patient.findOne({
      where: { id },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name"],
        },
      ],
    });
  }

  async findByUserId(userId: number) {
    return Patient.findOne({
      where: { userId },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name"],
        },
      ],
    });
  }

  async create(data: Partial<PatientDto> & { userId: number }) {
    const patient = await Patient.create(data);
    return await this.findByUserId(patient.userId);
  }

  async update(id: number, data: Partial<PatientDto>) {
    const patient = await this.findById(id);
    if (!patient) throw new BadRequestError("Paciente não encontrado.");
    await patient.update(data);
    return patient;
  }

  async delete(id: number): Promise<void> {
    const patient = await this.findById(id);
    if (!patient) throw new BadRequestError("Paciente não encontrado.");

    await patient.destroy();
  }

  async updateByUserId(
    userId: number,
    data: Partial<PatientDto>
  ): Promise<Patient> {
    const patient = await this.findByUserId(userId);
    if (!patient) throw new BadRequestError("Paciente não encontrado.");

    await patient.update(data);
    return patient;
  }
}
