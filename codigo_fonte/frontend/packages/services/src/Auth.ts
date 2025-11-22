import api from "./config/axios";
import type { userLogin } from "../../@types/userLogin";
import type { userRegister } from "../../@types/userRegister";
import { ApiError } from "@hisius/interfaces/src";

interface LoginResponse {
  id: number;
  name: string;
  email: string;
  role: number;
  accessToken: string | null;
}

interface ApiResponseGet {
  success: boolean;
  message: string;
  statusCode: number;
  data?: LoginResponse;
  errors?: ApiError[];
}

export class Auth {
  async Login(userData: userLogin): Promise<LoginResponse> {
    const response = await api.post<ApiResponseGet>(`/auth/login`, userData);
    return response.data.data;
  }

  async register(userData: userRegister): Promise<LoginResponse> {
    const response = await api.post<ApiResponseGet>(`/users`, userData);
    return response.data.data;
  }

  async changeEmail(newEmail: string) {
    const response = await api.post<ApiResponseGet>(
      `/auth/change-email-request`,
      { email: newEmail }
    );
    return response.data;
  }
  async changePass(email: string) {
    const response = await api.post<ApiResponseGet>(`/auth/forgot-password`, {
      email,
    });
    return response.data;
  }
}
