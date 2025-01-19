// src/questions/bfi-questions/bfi-questions.service.ts
import { Injectable } from '@nestjs/common';
import { BfiQuestionsRepository } from './bfi-questions.repository';
import { AbacusPersonalizationService } from '../../abacus/abacus-personalization.service';

@Injectable()
export class BfiQuestionsService {
  constructor(
    private readonly repository: BfiQuestionsRepository,
    private readonly abacusService: AbacusPersonalizationService
  ) {}

  async getQuestion(questionId: number, previousResponses: any[]) {
    const question = await this.repository.findQuestion(questionId);
    return this.abacusService.personalizesBFIQuestion(
      questionId,
      previousResponses
    );
  }
}