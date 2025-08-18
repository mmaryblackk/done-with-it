import { ApiResponse } from "apisauce";
import { IErrorResponse, IUser, IUserInfo } from "../types/interfaces";
import client from "./client";

type IUserResponse = Omit<IUser, "password">;

const register = (
  userInfo: IUserInfo
): Promise<ApiResponse<IUserResponse, IErrorResponse>> =>
  client.post("/users", userInfo);

export default { register };
