// frontend/src/utils/errorHandling.ts
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public data?: unknown
  ) {
    super(message);
  }
}

export const handleApiError = (err: unknown): ApiError => {
  if (err instanceof Error) {
    return new ApiError(500, `The error (${err.message}) appeared`);
  } else {
    return new ApiError(500, 'An unexpected error occurred');
  }
};