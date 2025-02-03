// frontend/src/services/ProfileService.ts
import { QuestionWithOptions, UserProfile } from "@/models/interfaces";
import { HttpUtility } from "./HttpUtility";

export class ProfileService {
  
  private static instance: ProfileService | null = null;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_NEST_URL || '';
  }

  public static getInstance(): ProfileService {
    if (!ProfileService.instance) {
      ProfileService.instance = new ProfileService();
    }
    return ProfileService.instance;
  }

  async createProfile(
    data: UserProfile
  ): Promise<{ id: string }> {
    return HttpUtility.post<{ id: string }>(`${this.baseUrl}profile/create`, data);
  }

  async getInitialQuestionWithOptions(): Promise<QuestionWithOptions> {
    return await HttpUtility.get<QuestionWithOptions>(`${this.baseUrl}questions/profile/initial`);
  }

  async getQuestionWithOptions(
    uuid: string,
    questionId: number
  ): Promise<QuestionWithOptions> {
    const profileId = uuid;
    return await HttpUtility.get<QuestionWithOptions>(`${this.baseUrl}questions/profile/questionId/${questionId}/`, {
      profileId
    });
  }

  async submitAnswer(
    profileId: string,
    variable: string,
    answer: number[]
  ): Promise<void> {
    return HttpUtility.post(`${this.baseUrl}responses/profile`, {
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
    return HttpUtility.post(`${this.baseUrl}responses/profile/other`, {
      profileId,
      variable,
      answer
    });
  }

}