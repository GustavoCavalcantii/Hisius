import axios from "axios";
import LocalStorageManager from "../helpers/localStorageManager";
import { logout, saveToken } from "../helpers/asyncStorage";
import { env } from "./env";

let isRefreshing = false;
let failedRequestsQueue = [];

const processQueue = (error, token = null) => {
  failedRequestsQueue.forEach((request) => {
    if (error) {
      request.reject(error);
    } else {
      request.resolve(token);
    }
  });
  failedRequestsQueue = [];
};

export const refreshTokenInterceptor = async (error) => {
  const originalRequest = error.config;

  const excludedRoutes = [
    "/auth/recover-password",
    "/auth/login",
    "/users",
    "/auth/confirm-change-email",
  ];

  const shouldSkipRefresh = excludedRoutes.some((route) =>
    originalRequest.url?.includes(route)
  );

  if (shouldSkipRefresh) {
    return Promise.reject(error);
  }

  if (!originalRequest._retry) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post(
          `${env.API_BASE_URL}/auth/refresh`,
          null,
          { withCredentials: true }
        );

        const accessToken = response.data.data.accessToken;

        LocalStorageManager.setTokens(accessToken);
        await saveToken(accessToken);
        axios.defaults.headers.Authorization = `Bearer ${accessToken}`;

        processQueue(null, accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        LocalStorageManager.clearAuth();
        await logout();
        delete axios.defaults.headers.Authorization;

        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
};
