// frontend/src/services/BFIService.ts
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
        uuid: string
    ): Promise<QuestionWithOptions> {
        return await HttpUtility.get<QuestionWithOptions>(`${this.baseUrl}questions/bfi/initial`, {
            headers: {'profileId:': uuid}
        });
    }

    async getQuestionWithAnswers(
        uuid: string,
        questionId: number
    ): Promise<QuestionWithOptions> {
        return await HttpUtility.get<QuestionWithOptions>(`${this.baseUrl}questions/bfi/questionId/${questionId}`, {
            headers: {'profileId:': uuid}
        });
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