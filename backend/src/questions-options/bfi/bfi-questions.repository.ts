// src/questions/bfi-questions/bfi-questions.repository.ts
import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../supabase/service';
import { BfiQuestionsEntity } from '../../entities/question';

@Injectable()
export class BfiQuestionsRepository {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findQuestion(id: number): Promise<BfiQuestionsEntity> {
    const { data } = await this.supabaseService.query('bfi_questions', { id });
    return data;
  }

  async findOptions(questionId: number) {
    const { data } = await this.supabaseService.query('bfi_options', { 
      question_id: questionId 
    });
    return data;
  }

  async saveResponse(response: {
    profile: string;
    var01_var44: number;
  }) {
    await this.supabaseService.query('bfi_responses', response);
  }
}