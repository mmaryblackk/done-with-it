import { ApiResponse } from "apisauce";
import client from "./client";

const login = (email: string, password: string): Promise<ApiResponse<string>> =>
  client.post("/auth", { email, password });

export default {
  login,
};
