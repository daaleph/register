// src/utils/errorHandling.ts
export class ApiError extends Error {
    constructor(
      public statusCode: number,
      message: string,
      public data?: any
    ) {
      super(message);
    }
  }
  
  export const handleApiError = (error: any): ApiError => {
    // Add error handling logic
    return new ApiError(500, 'An unexpected error occurred');
  };