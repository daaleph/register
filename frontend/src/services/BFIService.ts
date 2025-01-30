// src/services/BFIService.ts

import { QuestionWithOptions } from "@/models/interfaces";
import { HttpUtility } from "./HttpUtility";

export class BfiService {

    private static instance: BfiService | null = null;
    private baseUrl: string;

    constructor() {
        this.baseUrl = process.env.NEXT_PUBLIC_NEST_URL || '';
    }

    public static getInstance(): BfiService {
        if (!BfiService.instance) {
          BfiService.instance = new BfiService();
        }
        return BfiService.instance;
    }

    async getInitialQuestionWithOptions(
        id: string
    ): Promise<QuestionWithOptions> {
        return await HttpUtility.get<QuestionWithOptions>(`${this.baseUrl}questions/bfi/${id}/initial`);
    }

    async getQuestionWithAnswers(
        uuid: string,
        questionId: number
    ): Promise<QuestionWithOptions> {
        return await HttpUtility.get<QuestionWithOptions>(`${this.baseUrl}questions/bfi/${uuid}/questionId/${questionId}`);
    }

    async submitAnswer(
        profileId: string,
        variable: string,
        answer: number[]
    ): Promise<void> {
        return HttpUtility.post(`${this.baseUrl}responses/bfi`, {
            profileId,
            variable,
            answer
        });
    }
}