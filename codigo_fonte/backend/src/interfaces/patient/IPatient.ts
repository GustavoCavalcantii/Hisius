import { Gender } from "../../enums/User/Gender";

export interface IPatient {
  id: number;
  usuario_id: number;
  cpf: string;
  sexo: Gender;
  telefone: string;
  data_nascimento: Date;
}
