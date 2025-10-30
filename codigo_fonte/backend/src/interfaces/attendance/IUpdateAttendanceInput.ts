import { AttendanceStatus } from "../../enums/Attendance/AttendanceStatus";
import { Destination } from "../../enums/Attendance/Destination";

export interface IUpdateAttendanceInput {
  dischargeDate?: Date | null;
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
