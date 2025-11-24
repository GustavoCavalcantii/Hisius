import api from "./config/axios";
import type { ApiResponse, IPatient, IQueuedInfo } from "@hisius/interfaces";

export class Patient {
  async getQueueInfo(): Promise<IQueuedInfo> {
    const response = await api.get<ApiResponse>(`/queue/me`);
    return response.data.data;
  }

  async getProfile(): Promise<IPatient> {
    const response = await api.get<ApiResponse>(`/patients/me`);
    return response.data.data;
  }

  async createProfile(patient: IPatient): Promise<boolean> {
    const response = await api.post<ApiResponse>(`/patients`, patient);
    return response.data != null;
  }

  async updateProfile(patient: IPatient): Promise<boolean> {
    const response = await api.put<ApiResponse>(`/patients/me`, patient);
    return response.data != null;
  }

  async leaveQueue() {
    const response = await api.delete<ApiResponse>(`/queue/leave`);
    return response.data != null;
  }
}
