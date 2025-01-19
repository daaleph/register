// src/services/ProductService.ts

import { Question } from "@/models/interfaces";
import { HttpUtility } from "./HttpUtility";

export class ProductService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    }

    async getProductQuestion(questionId: number): Promise<Question> {
        return HttpUtility.get(`${this.baseUrl}/questions/product/${questionId}`);
    }

    async submitProductAnswer(profileId: string, variable: string, answer: number[] | number): Promise<void> {
        return HttpUtility.post(`${this.baseUrl}/questions/product/answer`, {
            profileId,
            variable,
            answer
        });
    }
} // [source](search_result_14)