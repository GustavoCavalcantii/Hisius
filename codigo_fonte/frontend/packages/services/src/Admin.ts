import api from "./config/axios";
import type {
  UserResponse,
  ReportInfo,
  LogData,
  Pagination,
  ApiResponse,
  User,
} from "@hisius/interfaces";

interface LogsResponse {
  logs: LogData[];
  pagination: Pagination;
}

interface LogsResponse {
  users: User[];
  pagination: Pagination;
}

interface HospitalInfo {
  hospitalCode: string;
}

export class Admin {
  async getHospitalInfo(): Promise<HospitalInfo> {
    const response = await api.get<ApiResponse>(`admins/hospital-info`);
    return response.data.data;
  }

  async getReport(startDate: string, endDate: string): Promise<ReportInfo> {
    const response = await api.get<ApiResponse>("reports/", {
      params: {
        startDate,
        endDate,
      },
    });
    return response.data.data;
  }

  async getEmployees(
    nameFilter?: string,
    page: number = 0,
    limit: number = 10
  ): Promise<UserResponse> {
    const params: Record<string, string> = {};

    if (nameFilter && nameFilter.trim() !== "") {
      params.nameFilter = nameFilter.trim();
    }

    params.page = page.toString();
    params.limit = limit.toString();

    const response = await api.get<ApiResponse>(`/employees`, { params });

    return response.data.data;
  }

  async getEmployeeRegisterCode(): Promise<string> {
    const response = await api.post<ApiResponse>(`/admins/staff-code`);

    return response.data.data.token;
  }

  async getLogs(
    page?: number,
    limit?: number,
    userId?: number,
    action?: string,
    module?: string
  ): Promise<LogsResponse> {
    const config = {
      params: {
        ...(page && { page }),
        ...(limit && { limit }),
        ...(userId && { userId }),
        ...(action && { action }),
        ...(module && { module }),
      },
    };

    const response = await api.get<ApiResponse>(`/logs`, config);
    return response.data.data;
  }

  async getAdmins(
    nameFilter?: string,
    page: number = 0,
    limit: number = 10
  ): Promise<UserResponse> {
    const params: Record<string, string> = {};

    if (nameFilter && nameFilter.trim() !== "") {
      params.nameFilter = nameFilter.trim();
    }
    params.page = page.toString();
    params.limit = limit.toString();

    const response = await api.get<ApiResponse>(`/admins`, { params });

    return response.data.data;
  }
}
