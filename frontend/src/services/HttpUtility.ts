// frontend/src/services/HttpUtility.ts
import axios from 'axios';

export class HttpUtility {
    private static readonly MAX_RETRIES = 3;
    private static readonly TIMEOUT = 50000;
    private static readonly RETRY_DELAY = 1000;

    private static getAuthHeader(): Record<string, string> {
        const token = localStorage.getItem('auth_token');
        return token ? { Authorization: `Bearer ${token}` } : {};
    }

    static async get<T>(url: string, params?: any, retryCount = 0): Promise<T> {
        try {
            const headers = this.getAuthHeader();
            const response = await axios.get<T>(url, { 
                params,
                headers,
                timeout: this.TIMEOUT
            });
            return this.handleResponse<T>(response);
        } catch (error) {
            return this.handleError<T>(error, () => this.get(url, params, retryCount + 1), retryCount);
        }
    }

    static async post(url: string, data: any, config = {}): Promise<any> {
        const defaultConfig = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };
        
        const finalConfig = { 
            ...defaultConfig, 
            ...config,
            headers: {
                ...defaultConfig.headers
            }
        };
        
        return axios.post(url, data, finalConfig)
            .then(response => response.data)
            .catch(error => {
                throw error;
            });
    }

    private static handleResponse<T>(response: any): T {
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    private static async handleError<T>(
        error: any, 
        retryFn: () => Promise<T>, 
        retryCount: number
    ): Promise<T> {
        // Handle authentication errors
        if (error.response?.status === 401) {
            localStorage.removeItem('auth_token');
            window.location.href = '/';
            throw new Error('Authentication failed');
        }

        // Implement retry logic for network errors or 5xx responses
        if (retryCount < this.MAX_RETRIES && 
            (error.code === 'ECONNABORTED' || 
             error.response?.status >= 500 || 
             !error.response)) {
            await new Promise(resolve => setTimeout(resolve, this.RETRY_DELAY));
            return retryFn();
        }

        // Handle other errors
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
        throw new Error(errorMessage);
    }
}