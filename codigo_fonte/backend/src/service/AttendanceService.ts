import Attendance from "../database/models/Attendance";
import { IAttendanceQueryParams } from "../interfaces/attendance/IAttendanceQueryParams";
import { ICreateAttendanceInput } from "../interfaces/attendance/ICreateAttendanceInput";
import { IUpdateAttendanceInput } from "../interfaces/attendance/IUpdateAttendanceInput";
import { AttendanceRepository } from "../repositories/AttendanceRepository";
import { NotFoundError } from "../utils/errors/NotFoundError";

export class AttendanceService {
  private attendanceRepo = new AttendanceRepository();

  private sanitizeAttendance(attendance: any) {
    if (!attendance) return null;

    let data: any;
    if (attendance && typeof attendance.toJSON === "function")
      data = attendance.toJSON();

    if (!data) data = attendance;

    const { data_criacao, data_atualizacao, createdAt, updatedAt, ...rest } =
      data;
    return rest;
  }

  private sanitizeAttendances(attendances: Attendance[] | null | void) {
    if (!attendances) return [];
    return attendances.map((a) => this.sanitizeAttendance(a));
  }

  async create(attendanceInput: ICreateAttendanceInput, options?: any) {
    const attendance = await this.sanitizeAttendance(
      await this.attendanceRepo.create(attendanceInput, options)
    );

    if (!attendance)
      throw new NotFoundError("Registro de atendimento não encontrado");
    return this.sanitizeAttendance(attendance);
  }

  async update(attendanceInput: IUpdateAttendanceInput, id: number) {
    const attendance = await this.attendanceRepo.updateById(
      id,
      attendanceInput
    );

    if (!attendance)
      throw new NotFoundError("Registro de atendimento não encontrado");
    return this.sanitizeAttendance(attendance);
  }

  async getById(id: number) {
    const attendance = await this.attendanceRepo.findById(id);
    if (!attendance)
      throw new NotFoundError("Registro de atendimento não encontrado");
    return this.sanitizeAttendance(attendance);
  }

  async delete(id: number) {
    const attendance = await this.attendanceRepo.deleteById(id);
    if (!attendance)
      throw new NotFoundError("Registro de atendimento não encontrado");
    return this.sanitizeAttendance(attendance);
  }

  async getPaginated(queryParams: IAttendanceQueryParams) {
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
