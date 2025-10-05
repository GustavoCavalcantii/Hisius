import Patient from "../database/models/Patient";
import { Gender } from "../enums/User/Gender";

export class PatientService {
  async getByUserId(userId: number) {
    const patientMock = {
      id: 1,
      userId: 6,
      cpf: "123.456.789-00",
      gender: Gender.MALE,
      phone: "(11) 91234-5678",
      birthDate: new Date("1990-05-15"),
    };

    return patientMock as Patient;
  }
  async getById(id: number) {
    const patientMock = {
      id: 1,
      userId: 6,
      cpf: "123.456.789-00",
      gender: Gender.MALE,
      phone: "(11) 91234-5678",
      birthDate: new Date("1990-05-15"),
    };

    return patientMock as Patient;
  }
}
