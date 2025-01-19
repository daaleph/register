// src/services/AuthService.ts
import axios from 'axios';

export class AuthService {
    private baseUrl: string;
    private tokenKey = 'auth_token';
  
    constructor() {
        this.baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    }
  
    async login(profileId: string): Promise<{ token: string }> {
        const response = await axios.post(`${this.baseUrl}/auth/login`, { profileId });
        const token = response.data as string;
        this.storeToken(token);
        return { token };
    }
  
    storeToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }
  
    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    logout(): void {
        localStorage.removeItem(this.tokenKey);
    }
}