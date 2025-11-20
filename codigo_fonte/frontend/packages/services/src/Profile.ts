import api from "./config/axios";

export async function getProfile(id) {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
}
