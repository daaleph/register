// frontend/src/services/AuthService.ts
import { CsrfToken } from '@/types/security';
import { HttpUtility } from './HttpUtility';
import { setCsrfToken } from './axios.config';

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

    async initialToken(): Promise<void> {
        const response = await HttpUtility.withRetry(() => 
            HttpUtility.get<CsrfToken>(`${this.baseUrl}auth/csrf-token`)
        );
        setCsrfToken(response.csrfToken)
    }

    async login<T>(
        email: string,
        password: string
    ): Promise<T> {
        return await HttpUtility.withRetry(() => 
            HttpUtility.post<T>(`${this.baseUrl}auth/login`, {
                email,
                password
            })
        );
    }

    async finalizeRegistrationWithPassword<T>(
        email: string,
        password: string
    ): Promise<T> {
        return await HttpUtility.withRetry(() => 
            HttpUtility.post<T>(`${this.baseUrl}auth/finalize`, { 
                email,
                password
            })
        );
    }

}