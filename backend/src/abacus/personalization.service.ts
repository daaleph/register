// src/abacus/abacus-personalization.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AbacusContextService } from './context.service';
import { ProfileOptionsEntity, ProfileQuestionsEntity, ProfileResponsesEntity } from 'src/entities';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AbacusPersonalizationService {
  constructor(
    private readonly httpService: HttpService,
    private readonly contextService: AbacusContextService
  ) {}

  async personalizesProfileQuestion(
    question: ProfileQuestionsEntity,
    previousQuestions: ProfileQuestionsEntity[],
    previousResponses: ProfileResponsesEntity[]
  ): Promise<ProfileQuestionsEntity> {
    const context = this.contextService.buildContext(previousQuestions, previousResponses, 'profile');
    return this.personalizeQuestion(question, context, 'profile');
  }

  async personalizesProfileOptions(
    options: ProfileOptionsEntity[],
    previousQuestions: ProfileQuestionsEntity[],
    previousResponses: ProfileResponsesEntity[]
  ): Promise<ProfileOptionsEntity[]> {
    const context = this.contextService.buildContext(previousQuestions, previousResponses, 'profile');
    return this.personalizeOptions(options, context, 'profile');
  }

  async personalizesBFIQuestion(question: ProfileQuestionsEntity, previousQuestions: any[], previousResponses: any[]) {
    const context = this.contextService.buildContext(previousQuestions, previousResponses, 'bfi');
    return this.personalizeQuestion(question, context, 'bfi');
  }

  async personalizesProductQuestion(question: ProfileQuestionsEntity, previousQuestions: any[], previousResponses: any[]) {
    const context = this.contextService.buildContext(previousQuestions, previousResponses, 'product');
    return this.personalizeQuestion(question, context, 'product');
  }

  private async personalizeQuestion(
    question: ProfileQuestionsEntity,
    context: any,
    type: string
  ) {
    const response = await firstValueFrom(
      this.httpService.post(
        'https://api.abacus.ai/personalize/question',
        {
          question,
          type,
          context
        }
      )
    );
    return response.data;
  }

  private async personalizeOptions(
    options: ProfileOptionsEntity[],
    context: any,
    type: string
  ) {
    const response = await firstValueFrom(
      this.httpService.post(
        'https://api.abacus.ai/personalize/question',
        {
          options,
          type,
          context
        }
      )
    );
    return response.data;
  }

}