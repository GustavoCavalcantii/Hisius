import { AttendanceStatus } from "../../enums/Attendance/AttendanceStatus";
import { Destination } from "../../enums/Attendance/Destination";
import { ManchesterClassification } from "../../enums/Queue/ManchesterClassification";

export interface ICreateAttendanceInput {
  userId: number;
  patientId: number;
  entryDate: Date;
  attendanceDate: Date;
  dischargeDate?: Date | null;
  priority: ManchesterClassification;
  mainComplaint: string;
  currentIllnessHistory?: string | null;
  allergies?: string | null;
  currentMedications?: string | null;
  mainDiagnosis?: string | null;
  secondaryDiagnoses?: string | null;
  proceduresPerformed?: string | null;
  destination: Destination;
  referralTo?: string | null;
  dischargeNotes?: string | null;
  status: AttendanceStatus;
}
