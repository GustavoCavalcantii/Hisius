import { Gender } from '../../enums/User/Gender';

export interface IPatient {
  id: number;
  userId: number;
  name: string;
  cpf?: string;
  phone?: string;
  gender?: Gender;
  birthDate?: Date | string;
}