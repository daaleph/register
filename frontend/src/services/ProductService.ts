// frontend/src/services/ProductService.ts
import { QuestionWithOptions } from "@/models/interfaces";
import { HttpUtility } from "./HttpUtility";

export class ProductService {

  private static instance: ProductService | null = null;
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_NEST_URL || '';
  }

  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  async getInitialQuestionWithOptions(
    uuid: string
  ): Promise<QuestionWithOptions> {
    const profileId = uuid;
    return await HttpUtility.get<QuestionWithOptions>(`${this.baseUrl}questions/product/initial`, {
      profileId
    });
  }

  async getQuestionWithAnswers(
    uuid: string,
    questionId: number
  ): Promise<QuestionWithOptions> {
    const profileId = uuid;
    return await HttpUtility.get<QuestionWithOptions>(`${this.baseUrl}questions/product/questionId/${questionId}`, {
      profileId
    });
  }

  async submitAnswer(
    profileId: string,
    variable: string,
    answer: number[]
  ): Promise<void> {
    return HttpUtility.post(`${this.baseUrl}responses/product/`, {
      profileId,
      variable,
      answer
    });
  }

  async submitOtherAnswer(
    profileId: string,
    variable: string,
    answer: string
  ): Promise<void> {
    return HttpUtility.post(`${this.baseUrl}responses/product/other/`, {
      profileId,
      variable,
      answer
    });
  }

}