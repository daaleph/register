// src/services/BFIService.ts

import { Question } from "@/models/interfaces";
import { HttpUtility } from "./HttpUtility";

export class BfiService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    }

    async getBfiQuestion(questionId: number): Promise<Question> {
        return HttpUtility.get(`${this.baseUrl}/questions/bfi/${questionId}`);
    }

    async submitBfiAnswer(profileId: string, variable: string, answer: number[] | number): Promise<void> {
        return HttpUtility.post(`${this.baseUrl}/questions/bfi/answer`, {
            profileId,
            variable,
            answer
        });
    }
}