import { ApiResponse } from "apisauce";
import { ICategory, IErrorResponse } from "../types/interfaces";
import client from "./client";

const ENDPOINT = "/categories";

const getCategories = (): Promise<ApiResponse<ICategory[], IErrorResponse>> =>
  client.get(ENDPOINT);

export default {
  getCategories,
};
