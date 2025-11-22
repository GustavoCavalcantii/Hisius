import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@hisius/interfaces/src";

export const saveToken = async (token: string) => {
  await AsyncStorage.setItem("token", token);
};

export const getToken = async () => {
  return await AsyncStorage.getItem("token");
};

export const getUser = async () => {
  return await AsyncStorage.getItem("user");
};

export const saveUser = async (user: User) => {
  await AsyncStorage.setItem("user", JSON.stringify(user));
};

export const logout = async () => {
  await AsyncStorage.removeItem("token");
};
