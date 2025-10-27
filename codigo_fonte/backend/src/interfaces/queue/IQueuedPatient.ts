import { ManchesterClassification } from "../../enums/Queue/ManchesterClassification";
import { Gender } from "../../enums/User/Gender";

export interface IQueuedPatient {
  id: number;
  name: string;
  age: number;
  birthDate: Date;
  cnsNumber: string;
  motherName: string;
  dateHourAttendance: string;
  gender: Gender;
  position: number;
  classification: ManchesterClassification | null;
}
