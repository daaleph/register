// src/questions-options/product/service.ts
import { Injectable } from '@nestjs/common';
import { ProductQuestionsRepository } from '../../repositories/questions/product';
import { AbacusPersonalizationService } from '../../abacus/personalization.service';

@Injectable()
export class ProductQuestionsService {
  constructor(
    private readonly repository: ProductQuestionsRepository,
    private readonly abacusService: AbacusPersonalizationService
  ) {}

  async getQuestion(questionId: number, previousResponses: any[]) {
    // const personalizedQuestion = await this.abacusService.personalizesProductQuestion(
    //   questionId,
    //   previousResponses
    // );
    // return personalizedQuestion;
  }

  async storeAnswer(profileId: string, variable: string, answer: number[]) {
    await this.repository.saveResponse({
      profile: profileId,
      variable,
      answer_options: answer,
      date_answer: new Date()
    });
  }
}