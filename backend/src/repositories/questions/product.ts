// backend/src/repositories/questions/product.ts

import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../supabase/service';
import { ProductQuestionEntity } from 'src/entities';
import { ProductOptionEntity } from 'src/entities';
import { ProfileQuestionsRepository } from './profile';
import { BfiQuestionsRepository } from './bfi';

@Injectable()
export class ProductQuestionsRepository {
  constructor(
    private readonly supabaseService: SupabaseService = new SupabaseService(),
    private readonly profileRepository: ProfileQuestionsRepository = new ProfileQuestionsRepository(),
    private readonly bfiRepository: BfiQuestionsRepository = new BfiQuestionsRepository(),
  ) {}

  async getPreviousQuestions(currentId: number): Promise<any> {
    const variables = Array.from(
      { length: currentId },
      (_, i) => `var${String(i + 1).padStart(2, '0')}`,
    );
    const profileQuestions = await this.profileRepository.getAllQuestions();
    const bfiQuestions = await this.bfiRepository.getAllQuestions();
    const { data } = await this.supabaseService
      .getConnection()
      .from('product_questions')
      .select()
      .in('variable', variables);
    return { data, profileQuestions, bfiQuestions };
  }

  async getPreviousResponses(uuid: string, currentId: number): Promise<any> {
    const variables = Array.from(
      { length: currentId },
      (_, i) => `var${String(i + 1).padStart(2, '0')}`,
    );
    const profileResponses = await this.profileRepository.getAllResponses(uuid);
    const bfiResponses = await this.bfiRepository.getAllResponses(uuid);
    const { data } = await this.supabaseService
      .getConnection()
      .from('product_responses_with_descriptions')
      .select()
      .in('variable', variables)
      .eq('profile', uuid);
    return { data, profileResponses, bfiResponses };
  }

  async findQuestion(id: number): Promise<ProductQuestionEntity> {
    const variable = `var${String(id).padStart(2, '0')}`;
    const { data } = await this.supabaseService.query('product_questions', {
      variable,
    });
    return data[0] as ProductQuestionEntity;
  }

  async findOptions(id: number): Promise<ProductOptionEntity[]> {
    const variable = `var${String(id).padStart(2, '0')}`;
    const { data } = await this.supabaseService.query('product_options', {
      variable,
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
