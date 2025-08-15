import { ApiResponse } from "apisauce";
import { ICategory } from "../types/interfaces";
import client from "./client";

const ENDPOINT = "/categories";

const getCategories = (): Promise<ApiResponse<ICategory[]>> =>
  client.get(ENDPOINT);

export default {
  getCategories,
};
