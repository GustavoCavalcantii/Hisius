import { Gender } from "../../enums/User/Gender";

export interface IUser {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  cpf?: string | null;
  telefone?: string | null;
  sexo?: Gender | null;
  data_nascimento?: Date | null;
  nivel_acesso?: number;
}
