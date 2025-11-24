import type { ApiError, ApiResponse } from "@hisius/interfaces/src";
import { useState, useCallback } from "react";

export const useFormErrors = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setFieldError = useCallback((field: string, message: string) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  }, []);

  const clearFieldError = useCallback((field: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  const handleApiErrors = useCallback((errorResponse: ApiResponse) => {
    const newErrors: Record<string, string> = {};

    if (errorResponse.errors?.length) {
      errorResponse.errors.forEach((error: ApiError) => {
        newErrors[error.field] = error.message;
      });
    }

    setErrors(newErrors);
  }, []);

  return {
    errors,
    setFieldError,
    clearFieldError,
    clearAllErrors,
    handleApiErrors,
  };
};
