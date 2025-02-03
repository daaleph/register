// frontend/src/services/HttpUtility.ts
import axiosInstance from './axios.config';
import { UserProfile } from '@/models/interfaces';
import { AxiosError } from 'node_modules/axios/index.cjs';


export class HttpUtility {

    static async get<T>(
        url: string,
        params?: Record<string, unknown>
    ): Promise<T> {
        try {
            const response = await axiosInstance.get(url, { params });
            return response.data as T;
        } catch (error) {
            this.handleError(error as AxiosError);
            throw error;
        }
    }
    static async post<T>(
        url: string,
        data: Record<string, unknown> | UserProfile,
    ): Promise<T> {
        try {
            const response = await axiosInstance.post(url, data);
            return response.data as T;
        } catch (error) {
            this.handleError(error as AxiosError);
            throw error;
        }
    }

    private static handleError(error: AxiosError): void {
        if (error.response) {
            console.error('Response error:', error.response.data);
            console.error('Status:', error.response.status);
            console.error('Headers:', error.response.headers);
            switch (error.response.status) {
                case 401:
                    console.error('Unauthorized access');
                    break;
                case 403:
                    console.error('Forbidden access');
                    break;
                case 404:
                    console.error('Resource not found');
                    break;
                case 422:
                    console.error('Validation failed');
                    break;
                case 500:
                    console.error('Internal server error');
                    break;
            }
        } else if (error.request) {
            console.error('Request error:', error.request);
        } else {
            console.error('Error:', error.message);
        }
    }

    static async withRetry<T>(
        operation: () => Promise<T>,
        maxRetries: number = 3,
        delay: number = 1000
    ): Promise<T> {
        let lastError: Error;
        for (let i = 0; i < maxRetries; i++) {
            try {
                return await operation();
            } catch (error) {
                lastError = error as Error;
                if (i === maxRetries - 1) break;
                await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
            }
        }
        throw lastError!;
    }

}