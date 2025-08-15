import { useState } from "react";
import { ApiResponse } from "apisauce";

export function useApi<T>(apiFunc: (...args: any) => Promise<ApiResponse<T>>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args: any) => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    if (!response.ok) {
      setError(true);
      return;
    }

    setError(false);
    setData(response.data ?? null);
  };

  return { request, data, error, loading };
}
