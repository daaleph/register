// src/abacus/abacus-personalization.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AbacusContextService, QuestionContext } from './abacus-context.service';

@Injectable()
export class AbacusPersonalizationService {
  constructor(
    private readonly httpService: HttpService,
    private readonly contextService: AbacusContextService
  ) {}

  async personalizesProfileQuestion(questionId: number, previousResponses: any[]) {
    const context = this.contextService.buildContext(previousResponses, 'profile');
    return this.personalizeQuestion(questionId, context, 'profile');
  }

  async personalizesBFIQuestion(questionId: number, previousResponses: any[]) {
    const context = this.contextService.buildContext(previousResponses, 'bfi');
    return this.personalizeQuestion(questionId, context, 'bfi');
  }

  async personalizesProductQuestion(questionId: number, previousResponses: any[]) {
    const context = this.contextService.buildContext(previousResponses, 'product');
    return this.personalizeQuestion(questionId, context, 'product');
  }

  private async personalizeQuestion(
    questionId: number,
    context: QuestionContext[],
    type: string
  ) {
    const response = await this.httpService.post(
      'https://api.abacus.ai/personalize/question',
      {
        questionId,
        type,
        context
      }
    ).toPromise();
    return response.data;
  }
}