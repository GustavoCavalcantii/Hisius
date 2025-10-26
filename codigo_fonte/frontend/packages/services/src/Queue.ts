import api from "./config/axios";
import type { ApiError, IPatient } from "@hisius/interfaces";

interface ApiResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data?: any;
  errors?: ApiError[];
}

interface ApiResponseGet {
  success: boolean;
  message: string;
  statusCode: number;
  data?: IPatient;
  errors?: ApiError[];
}

export class Queue {
  async getPatientByQueue(
    isTriage: boolean,
    nameFilter?: string
  ): Promise<IPatient[]> {
    const params: Record<string, string> = {};

    if (nameFilter && nameFilter.trim() !== "") {
      params.nameFilter = nameFilter.trim();
    }

    const response = await api.get<ApiResponse>(
      `/queue/${isTriage ? "triage" : "treatment"}/patients`,
      Object.keys(params).length > 0 ? { params } : {}
    );

    return response.data.data;
  }

  async getPatient(id: number): Promise<IPatient> {
    const response = await api.get<ApiResponseGet>(`/patients/${id}`);
    return response.data.data;
  }

  async getNextPatient(isTriage: boolean, room: string): Promise<IPatient> {
    const response = await api.post<ApiResponseGet>(
      `/queue/${isTriage ? "triage" : "treatment"}/call-next`,
      { room }
    );
    return response.data.data;
  }

  async updateClassification(
    id: number,
    classification: string
  ): Promise<IPatient | ApiError[]> {
    const response = await api.put<ApiResponseGet>(`/queue/${id}`, {
      classification: classification.toLowerCase(),
    });

    return response.data.data;
  }

  async getQueueCount(type: string): Promise<number> {
    const response = await api.get<ApiResponse>(`/queue/${type}/count`);
    return response.data.data.count;
  }

  async goToTreatment(
    id: number,
    classification: string
  ): Promise<IPatient | ApiError[]> {
    const response = await api.put<ApiResponseGet>(`/queue/${id}/next`, {
      classification: classification.toLowerCase(),
    });

    return response.data.data;
  }
}
