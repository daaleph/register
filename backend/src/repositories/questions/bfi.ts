// backend/src/repositories/questions/bfi.ts
import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../supabase/service';
import { BfiOptionsEntity } from 'src/entities/bfi/options';
import { ResponsesEntity } from 'src/entities/responses';
import { BfiQuestionsEntity } from 'src/entities/bfi/question';
import { ProfileQuestionsRepository } from '../../repositories/questions/profile';

@Injectable()
export class BfiQuestionsRepository {
  constructor(
    private readonly supabaseService: SupabaseService = new SupabaseService(),
    private readonly profileRepository: ProfileQuestionsRepository = new ProfileQuestionsRepository()
  ) {}

  async findQuestion(id: number): Promise<BfiQuestionsEntity> {
    const variable = `var${String(id).padStart(2, '0')}`;
    const { data } = await this.supabaseService.query('bfi_questions', {
      variable,
    });
    return Array.isArray(data) ? data[0] : data;
  }

  async findOptions(id: number): Promise<BfiOptionsEntity[]> {
    const variable = `var${String(id).padStart(2, '0')}`;
    const { data } = await this.supabaseService.query('bfi_options', {
      variable,
    });
    return data;
  }

  async getPreviousQuestions(currentId: number): Promise<any> {
    const profileQuestions = this.profileRepository.getAllQuestions();
    const variables = Array.from({ length: currentId }, (_, i) => `var${String(i + 1).padStart(2, '0')}`);
    const { data } = await this.supabaseService
      .getConnection()
      .from('bfi_questions')
      .select()
      .in('variable', variables);

    return { data, profileQuestions };
  }

  async getPreviousResponses(uuid: string, currentId: number): Promise<any> {
    const variables = Array.from({ length: currentId }, (_, i) => `var${String(i + 1).padStart(2, '0')}`);
    const profileResponses = this.profileRepository.getAllResponses(uuid);
    const { data } = await this.supabaseService
      .getConnection()
      .from('bfi_responses_with_descriptions')
      .select()
      .in('variable', variables)
      .eq('profile', uuid);
    return { data, profileResponses };
  }

  async findAndCustomizeQuestion(id: number, personalizedQuestion: any): Promise<BfiQuestionsEntity> {
    const baseQuestion = await this.findQuestion(id);
    return {
      ...baseQuestion,
      ...personalizedQuestion
    };
  }

  async saveResponse(response: ResponsesEntity): Promise<ResponsesEntity> {
    const { data } = await this.supabaseService.query('bfi_responses', response);
    return data;
  }

}