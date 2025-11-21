import api from "./config/axios";
import type {
  ApiError,
  UserResponse,
  ReportInfo,
} from "@hisius/interfaces";

interface ApiResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data?: any;
  errors?: ApiError[];
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

  async getEmployees(nameFilter?: string): Promise<UserResponse> {
    const params: Record<string, string> = {};

    if (nameFilter && nameFilter.trim() !== "") {
      params.nameFilter = nameFilter.trim();
    }

    const response = await api.get<ApiResponse>(
      `/employees`,
      Object.keys(params).length > 0 ? { params } : {}
    );

    return response.data.data;
  }

  async getEmployeeRegisterCode(): Promise<string> {
    const response = await api.post<ApiResponse>(`/admins/staff-code`);

    return response.data.data.token;
  }

  async getAdmins(nameFilter?: string): Promise<UserResponse> {
    const params: Record<string, string> = {};

    if (nameFilter && nameFilter.trim() !== "") {
      params.nameFilter = nameFilter.trim();
    }

    const response = await api.get<ApiResponse>(
      `/admins`,
      Object.keys(params).length > 0 ? { params } : {}
    );

    return response.data.data;
  }
}
