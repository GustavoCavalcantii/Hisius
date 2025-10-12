import { ManchesterClassification } from "../../enums/Queue/ManchesterClassification";
import { Gender } from "../../enums/User/Gender";

export interface IQueuedPatient {
  id: number;
  name: string;
  age: number;
  gender: Gender;
  classification?: ManchesterClassification;
}
