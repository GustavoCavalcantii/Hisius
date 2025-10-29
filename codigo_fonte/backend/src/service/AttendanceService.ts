import { IAttendanceQueryParams } from "../interfaces/attendance/IAttendanceQueryParams";
import { ICreateAttendanceInput } from "../interfaces/attendance/ICreateAttendanceInput";
import { AttendanceRepository } from "../repositories/AttendanceRepository";

export class AttendanceService {
  private attendanceRepo = new AttendanceRepository();

  async create(attendanceInput: ICreateAttendanceInput, options?: any) {
    return this.attendanceRepo.create(attendanceInput, options);
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
      users: result.attendances,
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
