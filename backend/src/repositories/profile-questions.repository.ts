import { Injectable } from "@nestjs/common";
import { ProfileOptionsEntity } from "src/entities/profile-options.entity";
import { ProfileResponsesEntity } from "src/entities/profile-responses.entity";
import { ProfileQuestionsEntity } from "src/entities/question.entity";
import { SupabaseService } from "src/supabase/supabase.service";

// src/repositories/profile-questions.repository.ts
@Injectable()
export class ProfileQuestionsRepository {
    constructor(private readonly supabaseService: SupabaseService) {}

    async findQuestion(id: number): Promise<ProfileQuestionsEntity> {
        const { data } = await this.supabaseService.query('profile_questions', { id });
        return data;
    }

    async findOptionsForQuestion(variable: string): Promise<ProfileOptionsEntity[]> {
        const { data } = await this.supabaseService.query('profile_options', { variable });
        return data;
    }

    async saveProfileResponse(response: ProfileResponsesEntity): Promise<void> {
        await this.supabaseService.query('profile_responses', response);
    }
} // [source](search_result_11)