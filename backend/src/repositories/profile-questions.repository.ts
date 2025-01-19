// src/repositories/profile-questions.repository.ts

import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { ProfileOptionsEntity } from 'src/entities/profile-options.entity';
import { ProfileResponsesEntity } from 'src/entities/profile-responses.entity';
import { ProfileQuestionsEntity } from 'src/entities/profile-questions.entity';

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
    return data;
  }

  async findOptions(id: number): Promise<ProfileOptionsEntity> {
    const variable = `var${String(id).padStart(2, '0')}`;
    const { data } = await this.supabaseService.query('profile_options', {
      variable,
    });
    return data;
  }

  async getPreviousResponses(currentId: number): Promise<any[]> {
    const variable = `var${String(currentId).padStart(2, '0')}`;
    const { data } = await this.supabaseService.query('profile_responses', {
      
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