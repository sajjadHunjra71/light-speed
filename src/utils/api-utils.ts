/**
 * Extract error message from various error formats
 */
export const extractErrorMessage = (error: any): string => {
  if (typeof error === 'string') {
    return error;
  }

  if (error?.message) {
    return error.message;
  }

  if (error?.error) {
    return error.error;
  }

  if (error?.error_description) {
    return error.error_description;
  }

  return 'An unexpected error occurred';
};
