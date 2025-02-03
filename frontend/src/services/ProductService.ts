// frontend/src/services/ProductService.ts
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

  async getInitialQuestionWithOptions<T>(
    uuid: string
  ): Promise<T> {

    const profileId = uuid;
    return await HttpUtility.withRetry(() => 
      HttpUtility.get<T>(`${this.baseUrl}questions/product/initial/`, {
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
      HttpUtility.get<T>(`${this.baseUrl}questions/product/questionId/${questionId}/`, {
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
      HttpUtility.post(`${this.baseUrl}responses/product`, { 
        profileId, 
        variable, 
        answer 
      })
    );
  }


  async submitOtherAnswer(
    profileId: string,
    variable: string,
    answer: string
  ): Promise<void> {
    return await HttpUtility.withRetry(() => 
      HttpUtility.post(`${this.baseUrl}responses/product/other`, {
        profileId,
        variable,
        answer
      })
    );
  }

}