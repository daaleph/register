// src/services/AuthService.ts
import axios from 'axios';

export class AuthService {
    private baseUrl: string;
    private tokenKey = 'auth_token';
    private refreshTokenTimeout!: NodeJS.Timeout;
  
    constructor() {
        this.baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    }

    private parseToken(token: string | null): any {
        if (!token) return null;
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch {
            return null;
        }
    }
  
    async login(profileId: string): Promise<{ token: string }> {
        try {
            const response = await axios.post(`${this.baseUrl}/auth/login`, { profileId });
            const token = response.data as string;
            this.storeToken(token);
            this.startTokenRefreshTimer();
            return { token };
          } catch (error) {
            throw new Error('Authentication failed');
          }
    }

    private startTokenRefreshTimer() {
        
        if (this.refreshTokenTimeout) {
            clearTimeout(this.refreshTokenTimeout);
        }

        const jwtToken = this.parseToken(this.getToken());
        if (!jwtToken) {
            return;
        }
        
        const expires = (jwtToken.exp * 1000) - Date.now() - (5 * 60 * 1000);
        if (expires <= 0) {
            this.logout();
            return;
        }

        this.refreshTokenTimeout = setTimeout(() => this.refreshToken(), expires);
    }

    private async refreshToken() {
        try {
            const response = await axios.post(`${this.baseUrl}/auth/refresh`);
            const token = response.data as string;
            this.storeToken(token);
            this.startTokenRefreshTimer();
        } catch {
            this.logout();
        }
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
        if (this.refreshTokenTimeout) {
            clearTimeout(this.refreshTokenTimeout);
        }
        localStorage.removeItem(this.tokenKey);
    }
}