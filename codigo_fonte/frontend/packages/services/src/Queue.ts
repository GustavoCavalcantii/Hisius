import api from "./config/axios";
import type { IPatient } from "@hisius/interfaces";

interface ApiResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: IPatient[];
}

interface ApiResponseGet {
  success: boolean;
  message: string;
  statusCode: number;
  data: IPatient;
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

  async getNextPatient(isTriage: boolean): Promise<IPatient[]> {
    const response = await api.get<ApiResponse>(
      `/queue/${isTriage ? "triage" : "treatment"}/call-next`
    );
    return response.data.data;
  }
}
