import { useState, useCallback } from 'react';
import toastService from '../services/toastService';

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  execute: (...args: any[]) => Promise<T | null>;
  reset: () => void;
}

interface UseApiOptions {
  showSuccessToast?: boolean;
  successMessage?: string;
  showErrorToast?: boolean;
  errorMessage?: string;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

/**
 * Hook for handling API requests with loading and error states
 *
 * @param apiFunc API function to call
 * @param options Additional options
 * @returns API response object with data, loading, error, execute and reset
 *
 * @example
 * ```
 * const getUserApi = useApi(userService.getUser);
 *
 * // In a component
 * const handleGetUser = async (userId) => {
 *   const user = await getUserApi.execute(userId);
 *   if (user) {
 *     // Do something with user
 *   }
 * };
 *
 * // Access loading and error states
 * if (getUserApi.loading) return <Loading />;
 * if (getUserApi.error) return <Error message={getUserApi.error.message} />;
 * ```
 */
function useApi<T>(
  apiFunc: (...args: any[]) => Promise<T>,
  options: UseApiOptions = {}
): ApiResponse<T> {
  const {
    showSuccessToast = false,
    successMessage = 'Success!',
    showErrorToast = true,
    errorMessage,
    onSuccess,
    onError,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      try {
        setLoading(true);
        setError(null);

        const result = await apiFunc(...args);
        setData(result);

        if (showSuccessToast) {
          toastService.success(successMessage);
        }

        if (onSuccess) {
          onSuccess(result);
        }

        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);

        if (showErrorToast) {
          toastService.error(errorMessage || error.message);
        }

        if (onError) {
          onError(error);
        }

        return null;
      } finally {
        setLoading(false);
      }
    },
    [apiFunc, showSuccessToast, successMessage, showErrorToast, errorMessage, onSuccess, onError]
  );

  return { data, loading, error, execute, reset };
}

export default useApi;
