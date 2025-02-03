// frontend/src/services/axios.config.ts
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_NEST_URL,
    withCredentials: true,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

let csrfToken: string = '';

export const setCsrfToken = (token: string): void => {
    csrfToken = token;
};

axiosInstance.interceptors.request.use((config) => {
    if (csrfToken) {
        config.headers = config.headers || {};
        config.headers['x-csrf-token'] = csrfToken;
    }
    return config;
});

export default axiosInstance;