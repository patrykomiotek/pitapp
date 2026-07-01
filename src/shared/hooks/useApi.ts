import { useEffect, useState } from "react";

interface ApiResponse<T> {
  data: T;
  isLoading: boolean;
  isError: boolean;
}

export const useApi = <T>(
  fetcher: () => Promise<T>,
  initValue: T,
): ApiResponse<T> => {
  const [data, setData] = useState<T>(initValue);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let ignore = false;

    const loadData = async () => {
      try {
        // Abort Controller
        const response = await fetcher();
        if (!ignore) {
          setData(response);
        }
      } catch {
        // fail
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();

    return () => {
      ignore = true;
    };
  }, []);

  return { data, isLoading, isError };
};
