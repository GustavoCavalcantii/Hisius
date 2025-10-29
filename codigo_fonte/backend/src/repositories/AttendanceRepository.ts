import Attendance from "../database/models/Attendance";
import { ICreateAttendanceInput } from "../interfaces/attendance/ICreateAttendanceInput";

export class AttendanceRepository {
  async create(data: ICreateAttendanceInput, options?: any) {
    return Attendance.create(
      {
        patientId: data.patientId,
        entryDate: data.entryDate,
        attendanceDate: data.attendanceDate,
        dischargeDate: data.dischargeDate,
        priority: data.priority,
        mainComplaint: data.mainComplaint,
        currentIllnessHistory: data.currentIllnessHistory,
        allergies: data.allergies,
        currentMedications: data.currentMedications,
        mainDiagnosis: data.mainDiagnosis,
        secondaryDiagnoses: data.secondaryDiagnoses,
        proceduresPerformed: data.proceduresPerformed,
        destination: data.destination,
        referralTo: data.referralTo,
        dischargeNotes: data.dischargeNotes,
        status: data.status,
      },
      options
    );
  }
}
