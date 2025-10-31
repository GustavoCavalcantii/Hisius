import Attendance from "../database/models/Attendance";
import { IAttendance } from "../interfaces/attendance/IAttendance";
import { IAttendanceQueryParams } from "../interfaces/attendance/IAttendanceQueryParams";
import { ICreateAttendanceInput } from "../interfaces/attendance/ICreateAttendanceInput";
import { IUpdateAttendanceInput } from "../interfaces/attendance/IUpdateAttendanceInput";
import { IPagination } from "../interfaces/queue/IPagination";
import { AttendanceRepository } from "../repositories/AttendanceRepository";
import { NotFoundError } from "../utils/errors/NotFoundError";

export class AttendanceService {
  private attendanceRepo = new AttendanceRepository();

  private sanitizeAttendances(attendances: Attendance[] | null): IAttendance[] {
    if (!attendances || !Array.isArray(attendances)) {
      return [];
    }

    return attendances
      .filter(
        (attendance): attendance is Attendance =>
          attendance !== null &&
          attendance !== undefined &&
          typeof attendance.sanitize === "function"
      )
      .map((attendance) => attendance.sanitize());
  }

  async create(
    attendanceInput: ICreateAttendanceInput,
    options?: any
  ): Promise<IAttendance> {
    const attendance = await await this.attendanceRepo.create(
      attendanceInput,
      options
    );

    if (!attendance)
      throw new NotFoundError("Registro de atendimento não encontrado");

    return attendance.sanitize();
  }

  async update(
    attendanceInput: IUpdateAttendanceInput,
    id: number
  ): Promise<IAttendance> {
    const attendance = await this.attendanceRepo.updateById(
      id,
      attendanceInput
    );

    if (!attendance)
      throw new NotFoundError("Registro de atendimento não encontrado");
    return attendance.sanitize();
  }

  async getById(id: number): Promise<IAttendance> {
    const attendance = await this.attendanceRepo.findById(id);

    if (!attendance)
      throw new NotFoundError("Registro de atendimento não encontrado");

    return attendance.sanitize();
  }

  async delete(id: number): Promise<number> {
    const attendance = await this.attendanceRepo.deleteById(id);
    if (!attendance)
      throw new NotFoundError("Registro de atendimento não encontrado");

    return attendance;
  }

  async getPaginated(
    queryParams: IAttendanceQueryParams
  ): Promise<{ attendances: IAttendance[]; pagination: IPagination }> {
    const { page = 0, limit = 10, patientId, startDate, endDate } = queryParams;
    const offset = page * limit;

    const result = await this.attendanceRepo.findPaginated({
      offset,
      limit,
      patientId,
      startDate,
      endDate,
    });

    const totalPages = Math.ceil(result.total / limit);
    const hasNext = page < totalPages - 1;
    const hasPrev = page > 0;

    return {
      attendances: this.sanitizeAttendances(result.attendances),
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: result.total,
        itemsPerPage: limit,
        hasNext,
        hasPrev,
        nextPage: hasNext ? page + 1 : null,
        prevPage: hasPrev ? page - 1 : null,
      },
    };
  }
}
