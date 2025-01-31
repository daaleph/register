// frontend/src/services/AuthService.ts
import axios from 'axios';

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

    async intialToken(): Promise<string> {
        const response = await axios.get(`${this.baseUrl}auth/csrf-token`);
        const accessToken = response.data as {csrfToken: string}
        return accessToken.csrfToken;
    }

    async login(email: string, password: string): Promise<{ accessToken: string }> {
        const response = await axios.post(`${this.baseUrl}auth/login`, { email, password });
        const accessToken = response.data as string;
        return { accessToken };
    }

    async finalizeRegistrationWithPassword(email: string, password: string): Promise<{ accessToken: string }> {
        const response = await axios.post(`${this.baseUrl}auth/finalize`, { email, password });
        const accessToken = response.data as string;
        return { accessToken };
    }

}