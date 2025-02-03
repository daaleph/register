// frontend/src/services/BFIService.ts
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

    async getInitialQuestionWithOptions<T>(
        uuid: string
    ): Promise<T> {

        const profileId = uuid;
        return await HttpUtility.withRetry(() => 
            HttpUtility.get<T>(`${this.baseUrl}questions/bfi/initial`, {
                profileId
            })
        );

    }

    async getQuestionWithOptions<T>(
        uuid: string,
        questionId: number
    ): Promise<T> {

        const profileId = uuid;
        return await HttpUtility.withRetry(() => 
            HttpUtility.get<T>(`${this.baseUrl}questions/bfi/questionId/${questionId}/`, {
                profileId
            })
        );
        
    }

    async submitAnswer(
        profileId: string,
        variable: string,
        answer: number[]
    ): Promise<void> {
        return await HttpUtility.withRetry(() => 
            HttpUtility.post(`${this.baseUrl}responses/bfi`, { 
                profileId, 
                variable, 
                answer 
            })
        );
    }

}