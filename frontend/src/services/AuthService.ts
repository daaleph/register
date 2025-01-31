// frontend/src/services/AuthService.ts
import axios from 'axios';

export default class AuthService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = process.env.NEXT_PUBLIC_NEST_URL || '';
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