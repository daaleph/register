// src/services/ProfileService.ts

import { HttpUtility } from "./HttpUtility";

export class ProfileService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    }

    async getInitialProfileQuestion(): Promise<Question> {
        return HttpUtility.get(`${this.baseUrl}/questions/profile/initial`);
    }

    async getNextProfileQuestion(questionId: number, answer: number[] | number): Promise<Question> {
        return HttpUtility.get(`${this.baseUrl}/questions/profile/${questionId}`, { answer });
    }

    async submitProfileAnswer(profileId: string, variable: string, answer: number[] | number): Promise<void> {
        return HttpUtility.post(`${this.baseUrl}/questions/profile/answer`, {
            profileId,
            variable,
            answer
        });
    }
} // [source](search_result_3)[source](search_result_14)