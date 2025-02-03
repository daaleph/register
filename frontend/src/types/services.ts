// src/types/services.ts
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export type TokenResponse = {
  accessToken: string;
};
  
export interface AuthTokenResponse {
  token: string;
  expiresIn: number;
}