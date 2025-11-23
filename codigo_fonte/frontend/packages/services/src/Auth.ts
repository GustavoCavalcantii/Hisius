import api from "./config/axios";
import type { userLogin } from "../../@types/userLogin";
import type { userRegister } from "../../@types/userRegister";
import { ApiResponse, User } from "@hisius/interfaces/src";

interface LoginResponse {
  id: number;
  name: string;
  email: string;
  role: number;
  accessToken: string | null;
}

export class Auth {
  async Login(userData: userLogin): Promise<LoginResponse> {
    const response = await api.post<ApiResponse>(`/auth/login`, userData);
    return response.data.data;
  }

  async getProfile(): Promise<User> {
    const response = await api.get<ApiResponse>(`/users/me`);
    return response.data.data;
  }

  async register(userData: userRegister): Promise<LoginResponse> {
    const response = await api.post<ApiResponse>(`/users`, userData);
    return response.data.data;
  }

  getAuthHeaders = (token: string) => ({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  async resetEmail(token: string) {
    const response = await api.put<ApiResponse>(
      `/auth/confirm-change-email`,
      {},
      this.getAuthHeaders(token)
    );
    return response.data;
  }

  async resetPass(token: string, password: string, confirmPassword: string) {
    const response = await api.put<ApiResponse>(
      `/auth/recover-password`,
      { password, confirmPassword },
      this.getAuthHeaders(token)
    );
    return response.data;
  }

  async changeEmail(newEmail: string) {
    const response = await api.post<ApiResponse>(`/auth/change-email-request`, {
      email: newEmail,
    });
    return response.data;
  }

  async changePass(email: string) {
    const response = await api.post<ApiResponse>(`/auth/forgot-password`, {
      email,
    });
    return response.data;
  }
}
