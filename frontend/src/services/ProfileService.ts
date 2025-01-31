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

  async createProfile(data: UserProfile): Promise<{ id: string }> {
    return HttpUtility.post(`${this.baseUrl}profile/create`, data, {
      headers: {'Content-Type': 'application/json'},
      withCredentials: true
    });
  }

  async getInitialQuestionWithOptions(
    id: string
  ): Promise<QuestionWithOptions> {
    return await HttpUtility.get<QuestionWithOptions>(`${this.baseUrl}questions/profile/${id}/initial`);
  }

  async getQuestionWithOptions(
    uuid: string,
    questionId: number
  ): Promise<QuestionWithOptions> {
    return await HttpUtility.get<QuestionWithOptions>(`${this.baseUrl}questions/profile/${uuid}/questionId/${questionId}`);
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
    answer: string
  ): Promise<void> {
    return HttpUtility.post(`${this.baseUrl}responses/profile/other`, {
      profileId,
      variable,
      answer
    });
  }

  async verifyProfileAccess(profileId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}profile/${profileId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) return false;
      return true;
    } catch (error: unknown) {
      console.error("The error was:", error);
      return false;
    }
  }

}