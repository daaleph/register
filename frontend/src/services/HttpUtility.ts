// frontend/src/services/HttpUtility.ts
import { UserProfile } from '@/models/interfaces';
import axios from 'axios';

interface ErrorResponse {
    message?: string;
    status?: number;
    statusText?: string;
}

interface RequestConfig {
    headers?: Record<string, string>;
    withCredentials?: boolean;
    timeout?: number;
    params?: Record<string, unknown>;
}

interface HttpResponse<T> {
    data: T;
    status: number;
    statusText: string;
}

export class HttpUtility {

    private static readonly MAX_RETRIES = 3;
    private static readonly TIMEOUT = 50000;
    private static readonly RETRY_DELAY = 1000;

    private static getCsrfToken(): string | null {
        const csrfCookie = document.cookie
            .split('; ')
            .find(row => row.startsWith('csrf-token='));
        return csrfCookie ? csrfCookie.split('=')[1] : null;
    }

    static async get<T>(
        url: string, 
        params?: Record<string, unknown>, 
        retryCount = 0
    ): Promise<T> {
        try {
            const headers = {};
            const response = await axios.get<T>(url, { 
                params,
                headers,
                timeout: this.TIMEOUT
            });
            return this.handleResponse<T>(response);
        } catch (error) {
            return this.handleError<T>(error as Error, () => this.get(url, params, retryCount + 1), retryCount);
        }
    }

    static async post<T>(
        url: string, 
        data: Record<string, unknown> | UserProfile, 
        config: Partial<RequestConfig> = {}
    ): Promise<T> {
        const csrfToken = this.getCsrfToken();
        if (!csrfToken) throw new Error('CSRF token is missing. Please refresh the page.');
        const defaultConfig: RequestConfig = {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken,
            },
            withCredentials: true,
        };
        
        const finalConfig = { 
            ...defaultConfig, 
            ...config,
            headers: {
                ...defaultConfig.headers,
                ...config.headers
            }
        };
        
        return axios.post(url, data, finalConfig)
            .then(response => response.data)
            .catch(error => {
                throw error;
            });
    }

    private static handleResponse<T>(response: HttpResponse<T>): T {
        if (response.status >= 200 && response.status < 300) return response.data;
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    private static async handleError<T>(
        error: Error & { 
            response?: ErrorResponse; 
            code?: string 
        }, 
        retryFn: () => Promise<T>, 
        retryCount: number
    ): Promise<T> {
        if (error.response?.status === 401) {
            window.location.href = '/';
            throw new Error('Authentication failed');
        }
        if (retryCount < this.MAX_RETRIES && 
            (
                error.code === 'ECONNABORTED' || 
                error.response && error.response.status && error.response?.status >= 500 || 
                !error.response)
            ) {
                await new Promise(resolve => setTimeout(resolve, this.RETRY_DELAY));
                return retryFn();
            }
        const errorMessage = error.response?.message || error.message || 'An error occurred';
        throw new Error(errorMessage);
    }

}