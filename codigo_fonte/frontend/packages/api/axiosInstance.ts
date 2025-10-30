// src/api/axiosInstance.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8088",
  withCredentials: true,
});

export default api; 
