import api from "./config/axios";
import type { ApiError, IQueuedInfo } from "@hisius/interfaces";

interface ApiResponseGet {
  success: boolean;
  message: string;
  statusCode: number;
  data?: IQueuedInfo;
  errors?: ApiError[];
}

export class Patient {
  async getInfo(): Promise<IQueuedInfo> {
    const response = await api.get<ApiResponseGet>(`/queue/me`);
    return response.data.data;
  }

  async leaveQueue() {
    const response = await api.delete<ApiResponseGet>(`/queue/leave`);
    return response.data.data != null;
  }
}
