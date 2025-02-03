// frontend/src/services/AuthService.ts
import { HttpUtility } from './HttpUtility';
import axiosInstance, { setCsrfToken } from './axios.config';

export default class AuthService {
    private baseUrl: string;
    private static instance: AuthService | null = null;

    constructor() {
        this.baseUrl = process.env.NEXT_PUBLIC_NEST_URL || '';
    }

    public static getInstance(): AuthService {
        if (!AuthService.instance) {
          AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    async initialToken(): Promise<string> {
        const response = await axiosInstance.get(`${this.baseUrl}auth/csrf-token`);
        const { csrfToken } = response.data as { csrfToken: string, expiresIn: number};
        setCsrfToken(csrfToken);
        return csrfToken;
    }

    async login<T>(
        email: string,
        password: string
    ): Promise<T> {
        return await HttpUtility.post<T>(`${this.baseUrl}auth/login`, {
            email,
            password
        });
    }

    async finalizeRegistrationWithPassword<T>(
        email: string,
        password: string
    ): Promise<T> {
        return await HttpUtility.post<T>(`${this.baseUrl}auth/finalize`, { 
            email,
            password
        });
    }

}