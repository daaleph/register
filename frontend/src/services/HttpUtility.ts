// src/services/HttpUtility.ts
import axios from 'axios';

export class HttpUtility {
    private static getAuthHeader(): Record<string, string> {
        const token = localStorage.getItem('auth_token');
        return token ? { Authorization: `Bearer ${token}` } : {};
    }

    static async get(url: string, params?: any): Promise<any> {
        try {
            const headers = this.getAuthHeader();
            const response = await axios.get(url, { 
                params,
                headers 
            });
            return this.handleResponse(response);
        } catch (error) {
            return this.handleError(error);
        }
    }

    static async post(url: string, data: any): Promise<any> {
        try {
            const headers = this.getAuthHeader();
            const response = await axios.post(url, data, { headers });
            return this.handleResponse(response);
        } catch (error) {
            return this.handleError(error);
        }
    }

    private static handleResponse(response: any): any {
        return response.data;
    }

    private static handleError(error: any): any {
        throw error;
    }
}