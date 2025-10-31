import { Gender } from "../../enums/User/Gender";

export interface IPatient {
  id: number;
  userId: number;
  cpf: string;
  gender: Gender;
  phone: string;
  birthDate: Date;
  age: number;

  cnsNumber: string;
  icePhone: string;
  motherName: string;
}
