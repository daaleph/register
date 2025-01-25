// frontend/src/services/ProductService.ts

import { QuestionWithOptions } from "@/models/interfaces";
import { HttpUtility } from "./HttpUtility";

export class ProductService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    }

    async getInitialQuestionWithOptions(
      id: string
    ): Promise<QuestionWithOptions> {
      return await HttpUtility.get<QuestionWithOptions>(`${this.baseUrl}questions/product/${id}/initial`);
    }

    async getQuestionWithAnswers(
      uuid: string,
      questionId: number
    ): Promise<QuestionWithOptions> {
      return await HttpUtility.get<QuestionWithOptions>(`${this.baseUrl}questions/product/${uuid}/questionId/${questionId}`);
    }

    async submitAnswer(
      profileId: string,
      variable: string,
      answer: number[]
    ): Promise<void> {
      return HttpUtility.post(`${this.baseUrl}responses/profile/`, {
        profileId,
        variable,
        answer
      });
    }

    async submitOtherAnswer(
      profileId: string,
      variable: string,
      answer: string,
      nature: number
    ): Promise<void> {
      return HttpUtility.post(`${this.baseUrl}responses/profile/other`, {
        profileId,
        variable,
        answer,
        nature
      });
    }

}