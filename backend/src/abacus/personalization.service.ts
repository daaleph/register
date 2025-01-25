// backend/src/abacus/personalization.service.ts
import { Injectable, Options } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AbacusContextService } from './context.service';
import {
  ProfileOptionEntity,
  ProfileQuestionEntity,
  PreviousResponsesEntity,
  BfiQuestionEntity,
  BfiOptionEntity,
  ProductQuestionEntity,
  ProductOptionEntity
} from 'src/entities';
import { firstValueFrom } from 'rxjs';
import { AbacusContextEntity } from 'src/entities/abacus-context';

type QuestionEntity = ProfileQuestionEntity | BfiQuestionEntity | ProductQuestionEntity;
type QuestionType = 'profile' | 'bfi' | 'product' | 'unknown';

@Injectable()
export class AbacusPersonalizationService {
  constructor(
    private readonly httpService: HttpService,
    private readonly contextService: AbacusContextService
  ) {}

  async personalizesProfileQuestion(
    question: ProfileQuestionEntity,
    previousQuestions: ProfileQuestionEntity[],
    previousResponses: PreviousResponsesEntity[]
  ): Promise<ProfileQuestionEntity> {
    const context = this.contextService.buildContext(
      { profile: previousQuestions },
      { profile: previousResponses },
      'profile'
    );
    return this.personalizeQuestion(question, context);
  }

  async personalizesProfileOptions(
    options: ProfileOptionEntity[],
    previousQuestions: ProfileQuestionEntity[],
    previousResponses: PreviousResponsesEntity[]
  ): Promise<ProfileOptionEntity[]> {
    const context = this.contextService.buildContext(
      { profile: previousQuestions },
      { profile: previousResponses },
      'profile'
    );
    return this.personalizeOptions(options, context);
  }

  async personalizesBfiQuestion(
    question: BfiQuestionEntity,
    questions: {
      profile: ProfileQuestionEntity[],
      bfi?: BfiQuestionEntity[]
    },
    responses: {
      profile: PreviousResponsesEntity[],
      bfi?: PreviousResponsesEntity[]
    }
  ): Promise<BfiQuestionEntity> {
    const context = this.contextService.buildContext(questions, responses, 'bfi');
    return this.personalizeQuestion(question, context);
  }

  async personalizesBfiOptions(
    options: BfiOptionEntity[],
    questions: {
      profile: ProfileQuestionEntity[],
      bfi?: BfiQuestionEntity[]
    },
    responses: {
      profile: PreviousResponsesEntity[],
      bfi?: PreviousResponsesEntity[]
    }
  ): Promise<BfiOptionEntity[]> {
    const context = this.contextService.buildContext(questions, responses, 'bfi');
    return this.personalizeOptions(options, context);
  }

  async personalizesProductQuestion(
    question: ProductQuestionEntity,
    questions: {
      profile: ProfileQuestionEntity[],
      bfi: BfiQuestionEntity[],
      product?: ProductQuestionEntity[]
    },
    responses: {
      profile: PreviousResponsesEntity[],
      bfi: PreviousResponsesEntity[],
      product?: PreviousResponsesEntity[]
    }
  ): Promise<ProductQuestionEntity> {
    const context = this.contextService.buildContext(questions, responses, 'product');
    return this.personalizeQuestion(question, context);
  }

  private async personalizeQuestion<T extends QuestionEntity>(
    question: T,
    context: AbacusContextEntity
  ): Promise<T> {
    const payload = this.createQuestionPayload(question, context);
    const response = await this.makeAbacusRequest(
      process.env.CUSTOMIZE_QUESTION_TOKEN!,
      process.env.CUSTOMIZE_QUESTION_PROJECT!,
      payload
    );
    return JSON.parse(response.result.messages[1].text);
  }

  private async personalizeOptions<T extends ProfileOptionEntity | BfiOptionEntity | ProductOptionEntity>(
    options: T[],
    context: AbacusContextEntity
  ): Promise<T[]> {
    const payload = this.createOptionsPayload(options, context);
    const response = await this.makeAbacusRequest(
      process.env.CUSTOMIZE_OPTIONS_TOKEN!,
      process.env.CUSTOMIZE_OPTIONS_PROJECT!,
      payload
    );
    return JSON.parse(response.result.messages[1].text).options;
  }

  private createQuestionPayload(question: QuestionEntity, context: AbacusContextEntity) {
    return createPayload([{
      is_user: true,
      text: `context:${JSON.stringify(context)},question:${JSON.stringify(question)}`
    }]);
  }

  private createOptionsPayload(options: any[], context: AbacusContextEntity) {
    return createPayload([{
      is_user: true,
      text: `context:${JSON.stringify(context)},options:${JSON.stringify(options)}`
    }]);
  }

  private async makeAbacusRequest(token: string, projectId: string, payload: any) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `https://pa002.abacus.ai/api/v0/getChatResponse?deploymentToken=${token}&deploymentId=${projectId}`,
          payload,
          { headers: { 'Content-Type': 'application/json' } }
        )
      );
      return response.data;
    } catch (error) {
      this.handleError(error, payload);
    }
  }

  private handleError(error: any, payload: any) {
    console.error("Error occurred while making Abacus request:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: error.config,
      payload
    });
    throw error;
  }
}

const createPayload = (messages: {is_user: boolean, text: string}[]) => {
  return {
    messages,
    llmName: null,
    numCompletionTokens: null,
    systemMessage: null,
    temperature: 0.0,
    filterKeyValues: null,
    searchScoreCutoff: null,
    chatConfig: null
  };
}