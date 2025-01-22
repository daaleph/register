// backend/src/abacus/personalization.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AbacusContextService } from './context.service';
import { ProfileOptionsEntity, ProfileQuestionsEntity, ProfilePreviousResponsesEntity } from 'src/entities';
import { firstValueFrom } from 'rxjs';
import { AbacusContextEntity } from 'src/entities/abacus-context';

@Injectable()
export class AbacusPersonalizationService {
  constructor(
    private readonly httpService: HttpService,
    private readonly contextService: AbacusContextService
  ) {}

  async personalizesProfileQuestion(
    question: ProfileQuestionsEntity,
    previousQuestions: ProfileQuestionsEntity[],
    previousResponses: ProfilePreviousResponsesEntity[]
  ): Promise<ProfileQuestionsEntity> {
    const context = this.contextService.buildContext(previousQuestions, previousResponses, 'profile');
    const personalizedQuestion = await this.personalizeQuestion(question, context, 'profile');
    return JSON.parse(personalizedQuestion.result.messages[1].text);
  }

  async personalizesProfileOptions(
    options: ProfileOptionsEntity[],
    previousQuestions: ProfileQuestionsEntity[],
    previousResponses: ProfilePreviousResponsesEntity[],
    id: number
  ): Promise<ProfileOptionsEntity[]> {
    const context = this.contextService.buildContext(previousQuestions, previousResponses, 'profile');
    const personalizedOptions = await this.personalizeOptions(options, context, 'profile', id);
    return JSON.parse(personalizedOptions.result.messages[1].text).options;
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
    context: AbacusContextEntity,
    type: string
  ) {

    const payload = createPayload([
      {
        is_user: true,
        text: `
          generalContext: {"type":"${type}", "context":${JSON.stringify(context)},"order":${question.id}},
          question:
            {"id":${question.id},
            "variable:${question.variable},
            "name_es":${question.name_es},
            "name_en":${question.name_en},
            "description_es":${question.description_es},
            "description_en":${question.description_es}"
          }`
      }
    ]);
  
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `https://pa002.abacus.ai/api/v0/getChatResponse?deploymentToken=${process.env.CUSTOMIZE_QUESTION_TOKEN}&deploymentId=${process.env.CUSTOMIZE_QUESTION_PROJECT}`,
          payload,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
      );
      return response.data;
    } catch (error) {
      console.error("Error occurred while personalizing question:", {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: error.config,
        payload,
        question,
        context,
        type
      });
      throw error;
    }
  }

  private async personalizeOptions(
    options: ProfileOptionsEntity[],
    context: AbacusContextEntity,
    type: string,
    id: number
  ) {

    const payload = createPayload([
      {
        is_user: true,
        text: `
          generalContext: {"type":"${type}", "context":${JSON.stringify(context)},"order":${id}},
          options: ${JSON.stringify(options)}`
      }
    ]);

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `https://pa002.abacus.ai/api/v0/getChatResponse?deploymentToken=${process.env.CUSTOMIZE_OPTIONS_TOKEN}&deploymentId=${process.env.CUSTOMIZE_OPTIONS_PROJECT}`,
          payload,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
      );
      return response.data;
    } catch (error) {
      console.error("Error occurred while personalizing question:", {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: error.config,
        payload,
        options,
        context,
        type
      });
      throw error;
    }
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