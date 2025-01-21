// frontend/src/services/ProfileService.ts

import { Question, UserProfile } from "@/models/interfaces";
import { HttpUtility } from "./HttpUtility";

export class ProfileService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = process.env.NEXT_PUBLIC_NEST_URL || '';
    }

    async createInitialProfile(data: UserProfile): Promise<{ id: string }> {
        return HttpUtility.post(`${this.baseUrl}profile/create`, data, {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
        });
    }

    async getInitialProfileQuestion(id: string): Promise<Question> {
        return HttpUtility.get(`${this.baseUrl}questions/profile/${id}/initial`);
    }

    async getNextProfileQuestion(uuid: string, questionId: number, answer: number[] | number): Promise<Question> {
        return HttpUtility.get(`${this.baseUrl}questions/profile/${uuid}/questionId/${questionId}`, { answer });
    }

    async submitProfileAnswer(profileId: string, variable: string, answer: number[] | number): Promise<void> {
        return HttpUtility.post(`${this.baseUrl}questions/profile/answer`, {
            profileId,
            variable,
            answer
        });
    }
}