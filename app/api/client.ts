import { ApiResponse, create } from "apisauce";
import cache from "../utility/cache";
import { AxiosRequestConfig } from "axios";

import authStorage from "../auth/storage";

const apiClient = create({
  baseURL: "http://192.168.50.83:9000/api",
});

apiClient.addAsyncRequestTransform(async (request: AxiosRequestConfig) => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;
  if (!request.headers) request.headers = {};
  request.headers["x-auth-token"] = authToken;
});

const originalGet: typeof apiClient.get = apiClient.get.bind(apiClient);

apiClient.get = async function <T, U = T>(
  url: string,
  params?: {},
  axiosConfig?: AxiosRequestConfig
): Promise<ApiResponse<T, U>> {
  const response = await originalGet<T, U>(url, params, axiosConfig);

  if (response.ok) {
    cache.store(url, response.data);
    return response;
  }

  const data = await cache.get(url);

  if (data) {
    return { ok: true, data } as any;
  }

  return response;
};

export default apiClient;
