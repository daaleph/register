// src/services/HttpUtility.ts

export class HttpUtility {
    static async get(url: string, params?: any): Promise<any> {
        try {
            const response = await axios.get(url, { params });
            return this.handleResponse(response);
        } catch (error) {
            return this.handleError(error);
        }
    }

    static async post(url: string, data: any): Promise<any> {
        try {
            const response = await axios.post(url, data);
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
} // [source](search_result_6)