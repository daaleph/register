// src/questions/product-questions/product-questions.repository.ts
import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../supabase/service';
import { ProductQuestionsEntity } from '../../entities/question';

@Injectable()
export class ProductQuestionsRepository {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findQuestion(id: number): Promise<ProductQuestionsEntity> {
    const { data } = await this.supabaseService.query('product_questions', { id });
    return data;
  }

  async findOptions(variable: string) {
    const { data } = await this.supabaseService.query('product_options', { 
      variable 
    });
    return data;
  }

  async saveResponse(response: {
    profile: string;
    variable: string;
    answer_options: number[];
    date_answer: Date;
  }) {
    await this.supabaseService.query('product_responses', response);
  }
}