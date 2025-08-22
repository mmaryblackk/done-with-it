import { useState } from "react";
import { ApiResponse } from "apisauce";

export function useApi<T, U>(
  apiFunc: (...args: any[]) => Promise<ApiResponse<T, U>>
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const request = async (...args: any[]): Promise<ApiResponse<T, U>> => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    if (!response.ok) {
      setError(
        (response.data as U & { error?: string })?.error ?? "Unexpected error"
      );
    } else {
      setError(null);
      setData(response.data ?? null);
    }

    return response;
  };

  return { request, data, error, loading };
}
