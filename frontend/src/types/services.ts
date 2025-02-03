// frontend/src/types/services.ts
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}