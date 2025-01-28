// backend/src/repositories/questions/profile.ts

import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/service';
import { ProfileOptionEntity } from 'src/entities/profile/options';
import { ResponsesEntity } from 'src/entities/responses';
import { ProfileQuestionEntity } from 'src/entities/profile/question';

@Injectable()
export class ProfileQuestionsRepository {

  constructor(
    private readonly supabaseService: SupabaseService = new SupabaseService()
  ) {}

  async findQuestion(id: number): Promise<ProfileQuestionEntity> {
    const variable = `var${String(id).padStart(2, '0')}`;
    const { data } = await this.supabaseService.query('profile_questions', {
      variable,
    });
    return data[0] as ProfileQuestionEntity;
  }

  async findOptions(id: number): Promise<ProfileOptionEntity[]> {
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

  async getAllQuestions(): Promise<any[]> {
    const { data } = await this.supabaseService
      .getConnection()
      .from('profile_questions')
      .select();
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

  async getAllResponses(uuid: string): Promise<any[]> {
    const { data } = await this.supabaseService
      .getConnection()
      .from('profile_responses_with_descriptions')
      .select()
      .eq('profile', uuid);
    return data;
  }

  async saveProfileResponse(response: ResponsesEntity): Promise<ResponsesEntity> {
    const { data } = await this.supabaseService.query('profile_responses', response);
    return data;
  }

}