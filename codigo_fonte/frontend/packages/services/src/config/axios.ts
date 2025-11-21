import axios from "axios";
import LocalStorageManager from "../helpers/localStorageManager";
import { refreshTokenInterceptor } from "./refreshInterceptors";
import { env } from "./env";
import { getToken } from "../helpers/asyncStorage";

const api = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: env.API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    const token = LocalStorageManager.getAccessToken() || (await getToken());
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (process.env.NODE_ENV === "development") {
      console.log(
        `🔄 ${config.method?.toUpperCase()} ${config.url}`,
        config.data || ""
      );
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use((response) => {
  if (process.env.NODE_ENV === "development") {
    console.log(
      `✅ ${response.config.method?.toUpperCase()} ${response.config.url}`,
      response.data
    );
  }
  return response;
}, refreshTokenInterceptor);

export default api;
