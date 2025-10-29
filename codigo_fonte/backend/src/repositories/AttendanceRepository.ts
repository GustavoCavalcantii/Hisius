import { Op } from "sequelize";
import Attendance from "../database/models/Attendance";
import { ICreateAttendanceInput } from "../interfaces/attendance/ICreateAttendanceInput";
import User from "../database/models/User";

export class AttendanceRepository {
  async create(data: ICreateAttendanceInput, options?: any) {
    return Attendance.create(
      {
        userId: data.userId,
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

  async findPaginated(params: {
    offset: number;
    limit: number;
    patientId?: number;
    startDate?: Date;
    endDate?: Date;
  }) {
    const { offset, limit, patientId, startDate, endDate } = params;
    const whereClause: any = {};

    if (patientId) {
      whereClause.patientId = {
        [Op.eq]: patientId,
      };
    }

    if (startDate || endDate) {
      whereClause.entryDate = {};

      if (startDate) {
        whereClause.entryDate[Op.gte] = startDate;
      }

      if (endDate) {
        whereClause.entryDate[Op.lte] = endDate;
      }
    }

    const { count, rows } = await await Attendance.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [
        ["entryDate", "DESC"],
        ["createdAt", "DESC"],
      ],
      include: [
        {
          association: "patient",
          attributes: ["id", "cpf"],
          include: [
            {
              model: User,
              as: "user",
              attributes: ["name"],
            },
          ],
        },
      ],
    });

    const transformedAttendances = rows.map((item) => {
      const attendance = item.toJSON();

      return {
        ...attendance,
        patient: {
          ...attendance.patient,
          name: attendance.patient.user.name,
          user: undefined,
        },
      };
    });

    return {
      attendances: transformedAttendances,
      total: count,
    };
  }
}
