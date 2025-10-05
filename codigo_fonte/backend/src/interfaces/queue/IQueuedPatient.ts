import { ManchesterClassification } from "../../enums/Queue/ManchesterClassification";

export interface IQueuedPatient {
  id: number;
  name: string;
  age: number;
  joinedAt: Date;
  classification?: ManchesterClassification;
}
