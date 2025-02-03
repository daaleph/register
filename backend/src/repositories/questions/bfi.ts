// backend/src/repositories/questions/bfi.ts

import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../supabase/service';
import { BfiQuestionEntity } from 'src/entities';
import { BfiOptionEntity } from 'src/entities';
import { ResponsesEntity } from 'src/entities/responses';
import { ProfileQuestionsRepository } from './profile';

@Injectable()
export class BfiQuestionsRepository {
  constructor(
    private readonly supabaseService: SupabaseService = new SupabaseService(),
    private readonly profileRepository: ProfileQuestionsRepository = new ProfileQuestionsRepository(),
  ) {}

  async getPreviousQuestions(currentId: number): Promise<any> {
    const profileQuestions = await this.profileRepository.getAllQuestions();
    const variables = Array.from(
      { length: currentId },
      (_, i) => `var${String(i + 1).padStart(2, '0')}`,
    );
    const { data } = await this.supabaseService
      .getConnection()
      .from('bfi_questions')
      .select()
      .in('variable', variables);
    return { bfiQuestions: data, profileQuestions };
  }

  async getAllQuestions(): Promise<any[]> {
    const { data } = await this.supabaseService
      .getConnection()
      .from('bfi_questions')
      .select();
    return data;
  }

  async getPreviousResponses(uuid: string, currentId: number): Promise<any> {
    const variables = Array.from(
      { length: currentId },
      (_, i) => `var${String(i + 1).padStart(2, '0')}`,
    );
    const profileResponses = await this.profileRepository.getAllResponses(uuid);
    const { data } = await this.supabaseService
      .getConnection()
      .from('bfi_responses_with_descriptions')
      .select()
      .in('variable', variables)
      .eq('profile', uuid)
      .not('description_en', 'is', null);
    return { bfiResponses: data, profileResponses };
  }

  async getAllResponses(uuid: string): Promise<any[]> {
    const { data } = await this.supabaseService
      .getConnection()
      .from('bfi_responses_with_descriptions')
      .select()
      .eq('profile', uuid);
    return data;
  }

  async findQuestion(id: number): Promise<BfiQuestionEntity> {
    const variable = `var${String(id).padStart(2, '0')}`;
    const { data } = await this.supabaseService.query('bfi_questions', {
      variable,
    });
    return data[0] as BfiQuestionEntity;
  }

  async findOptions(): Promise<BfiOptionEntity[]> {
    const { data } = await this.supabaseService
      .getConnection()
      .from('bfi_options')
      .select();
    return data;
  }

  async saveResponse(response: ResponsesEntity): Promise<ResponsesEntity> {
    const { data } = await this.supabaseService.query(
      'bfi_responses',
      response,
    );
    return data;
  }
}
