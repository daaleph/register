// src/repositories/profile-questions.repository.ts

import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { ProfileOptionsEntity } from 'src/entities/profile-options.entity';
import { ProfileResponsesEntity } from 'src/entities/profile-responses.entity';
import { ProfileQuestionsEntity } from 'src/entities/profile-questions.entity';

@Injectable()
export class ProfileQuestionsRepository {

  constructor(
    private readonly supabaseService: SupabaseService
  ) {}

  async findQuestion(id: number): Promise<ProfileQuestionsEntity> {
    const { data } = await this.supabaseService.query('profile_questions', {
      id,
    });
    return data;
  }

  async findNextQuestionBasedOnAnswer(currentId: number, previousAnswer: number[] | number): Promise<ProfileQuestionsEntity> {
    // Query logic for questions 2-6 based on first question's answer
    const { data } = await this.supabaseService.query('profile_questions', {
      id: currentId + 1,
      // Add any additional filtering based on previousAnswer
    });
    return data;
  }

  async getPreviousResponses(currentId: number): Promise<any[]> {
    const { data } = await this.supabaseService.query('profile_responses', {
      // Query to get all previous responses up to currentId
    });
    return data;
  }

  async findAndCustomizeQuestion(id: number, personalizedQuestion: any): Promise<ProfileQuestionsEntity> {
    const baseQuestion = await this.findQuestion(id);
    return {
      ...baseQuestion,
      ...personalizedQuestion
    };
  }

  async saveProfileResponse(response: ProfileResponsesEntity): Promise<ProfileResponsesEntity> {
    const { data } = await this.supabaseService.query('profile_responses', response);
    return data;
  }
}