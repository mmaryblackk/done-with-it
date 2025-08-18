import { ApiResponse, create } from "apisauce";
import cache from "../utility/cache";
import { AxiosRequestConfig } from "axios";

const apiClient = create({
  baseURL: "http://192.168.50.83:9000/api",
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
