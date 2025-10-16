import { ManchesterTriage } from "packages/enums/src";

export interface IPatient {
  id: number;
  gender: string;
  name: string;
  age: number;
  classification?: ManchesterTriage;
  queuePos: number;
}
