// frontend/src/services/AuthService.ts
import axios from 'axios';

export default class AuthService {
    private baseUrl: string;
    private tokenKey = 'auth_token';

    constructor() {
        this.baseUrl = process.env.NEXT_PUBLIC_NEST_URL || '';
    }

    async login(email: string, password: string): Promise<{ accessToken: string }> {
        const response = await axios.post(`${this.baseUrl}auth/login`, { email, password });
        const accessToken = response.data as string;
        this.storeToken(accessToken);
        return { accessToken };
    }

    async finalizeRegistration(profileId: string): Promise<{ accessToken: string }> {
        const response = await axios.post(`${this.baseUrl}auth/finalize`, { profileId });
        const accessToken = response.data as string;
        this.storeToken(accessToken);
        return { accessToken };
    }

    async finalizeRegistrationWithPassword(email: string, password: string): Promise<{ accessToken: string }> {
        const response = await axios.post(`${this.baseUrl}auth/finalize`, { email, password });
        const accessToken = response.data as string;
        this.storeToken(accessToken);
        return { accessToken };
    }

    storeToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    logout(): void {
        localStorage.removeItem(this.tokenKey);
    }
}