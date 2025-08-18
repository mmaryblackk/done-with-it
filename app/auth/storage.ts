import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import { IUser } from "../types/interfaces";

const KEY = "authToken";

const storeToken = async (authToken: string) => {
  try {
    await SecureStore.setItemAsync(KEY, authToken);
  } catch (error) {
    console.log("Error storing the auth token", error);
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(KEY);
  } catch (error) {
    console.log("Error getting the auth token", error);
  }
};

const getUser = async (): Promise<IUser | null> => {
  const token = await getToken();
  return token ? jwtDecode(token) : null;
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(KEY);
  } catch (error) {
    console.log("Error removing the auth token", error);
  }
};

export default {
  getUser,
  getToken,
  storeToken,
  removeToken,
};
