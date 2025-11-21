import api from "./config/axios";
import type { ApiError, IPatient, IQueuedInfo } from "@hisius/interfaces";

interface ApiResponseGet {
  success: boolean;
  message: string;
  statusCode: number;
  data?: any;
  errors?: ApiError[];
}

export class Patient {
  async getQueueInfo(): Promise<IQueuedInfo> {
    const response = await api.get<ApiResponseGet>(`/queue/me`);
    return response.data.data;
  }

  async getProfile(): Promise<IPatient> {
    const response = await api.get<ApiResponseGet>(`/patients/me`);
    return response.data.data;
  }

  async leaveQueue() {
    const response = await api.delete<ApiResponseGet>(`/queue/leave`);
    return response.data.data != null;
  }
}
