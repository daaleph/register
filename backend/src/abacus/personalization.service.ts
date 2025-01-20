// src/abacus/service.ts
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
    const personalizedQuestion = await this.personalizeQuestion(question, context, 'profile');
    return personalizedQuestion;
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
    const messages = [
      {
        is_user: true,
        text: `
          context: {"type":"${type}",
          "context":${JSON.stringify(context)},"order":4},
          question:
            {"id":${question.id},
            "variable:${question.variable},
            "name_es":${question.name_es},
            "name_en":${question.name_en},
            "description_es":${question.description_es},
            "description_en":${question.description_es}"
          }`
      }
    ];
    
    const payload = {
      messages,
      llmName: null,
      numCompletionTokens: null,
      systemMessage: null,
      temperature: 0.0,
      filterKeyValues: null,
      searchScoreCutoff: null,
      chatConfig: null
    };
  
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
      // Log detailed error information
      console.error("Error occurred while personalizing question:", {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: error.config,
        payload, // Log the payload that was sent
        question, // Log the question for context
        context, // Log the context for additional information
        type
      });
  
      // Optionally, rethrow the error or handle it as needed
      throw error; // Rethrow the error if you want to propagate it
    }
  }

  private async personalizeOptions(
    options: ProfileOptionsEntity[],
    context: any,
    type: string
  ) {
    const response = await firstValueFrom(
      this.httpService.post(
        'https://api.abacus.ai/personalize/option',
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