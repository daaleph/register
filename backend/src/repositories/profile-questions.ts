// src/repositories/profile-questions.ts

import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/service';
import { ProfileOptionsEntity } from 'src/entities/profile-options';
import { ProfileResponsesEntity } from 'src/entities/profile-responses';
import { ProfileQuestionsEntity } from 'src/entities/profile-questions';

@Injectable()
export class ProfileQuestionsRepository {

  constructor(
    private readonly supabaseService: SupabaseService = new SupabaseService()
  ) {}

  async findQuestion(id: number): Promise<ProfileQuestionsEntity> {
    const variable = `var${String(id).padStart(2, '0')}`;
    const { data } = await this.supabaseService.query('profile_questions', {
      variable,
    });
    return Array.isArray(data) ? data[0] : data;
  }

  async findOptions(id: number): Promise<ProfileOptionsEntity[]> {
    const variable = `var${String(id).padStart(2, '0')}`;
    const { data } = await this.supabaseService.query('profile_options', {
      variable,
    });
    return data;
  }

  async getPreviousQuestions(currentId: number): Promise<any[]> {
    const variables = Array.from({ length: currentId }, (_, i) => `var${String(i + 1).padStart(2, '0')}`);
    const { data } = await this.supabaseService
      .getConnection()
      .from('profile_questions')
      .select()
      .in('variable', variables);
    return data;
}

  async getPreviousResponses(uuid: string, currentId: number): Promise<any[]> {
    const variables = Array.from({ length: currentId }, (_, i) => `var${String(i + 1).padStart(2, '0')}`);
    const { data } = await this.supabaseService
      .getConnection()
      .from('profile_responses_with_descriptions')
      .select()
      .in('variable', variables)
      .eq('profile', uuid);
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