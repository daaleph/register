// backend/src/abacus/personalization.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AbacusContextService } from './context.service';
import {
  ProfileOptionsEntity,
  ProfileQuestionEntity,
  PreviousResponsesEntity,
  BfiQuestionEntity,
  BfiOptionsEntity,
  ProductQuestionEntity,
  ProductOptionsEntity
} from 'src/entities';
import { firstValueFrom } from 'rxjs';
import { AbacusContextEntity } from 'src/entities/abacus-context';

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
    const context = this.contextService.buildContext(previousQuestions, previousResponses, 'profile');
    const personalizedQuestion = await this.personalizeProfileQuestion(question, context);
    return JSON.parse(personalizedQuestion.result.messages[1].text);
  }

  async personalizesProfileOptions(
    options: ProfileOptionsEntity[],
    previousQuestions: ProfileQuestionEntity[],
    previousResponses: PreviousResponsesEntity[]
  ): Promise<ProfileOptionsEntity[]> {
    const context = this.contextService.buildContext(previousQuestions, previousResponses, 'profile');
    const personalizedOptions = await this.personalizeProfileOptions(options, context);
    return JSON.parse(personalizedOptions.result.messages[1].text).options;
  }

  async personalizesBfiQuestion(
    question: BfiQuestionEntity,
    previousQuestions: BfiQuestionEntity[],
    previousResponses: PreviousResponsesEntity[]
  ): Promise<BfiQuestionEntity> {
    const context = this.contextService.buildContext(previousQuestions, previousResponses, 'bfi');
    const personalizedQuestion = await this.personalizeBfiQuestion(question, context);
    return JSON.parse(personalizedQuestion.result.messages[1].text);
  }

  async personalizesBfiOptions(
    options: ProfileOptionsEntity[],
    previousQuestions: ProfileQuestionEntity[],
    previousResponses: PreviousResponsesEntity[]
  ): Promise<ProfileOptionsEntity[]> {
    const context = this.contextService.buildContext(previousQuestions, previousResponses, 'bfi');
    const personalizedOptions = await this.personalizeBfiOptions(options, context);
    return JSON.parse(personalizedOptions.result.messages[1].text).options;
  }

  async personalizesProductQuestion(
    question: ProfileQuestionEntity,
    previousQuestions: ProductQuestionEntity[],
    previousResponses: PreviousResponsesEntity[]
  ): Promise<BfiQuestionEntity> {
    const context = this.contextService.buildContext(previousQuestions, previousResponses, 'product');
    const personalizedQuestion = await this.personalizeProductQuestion(question, context);
    return JSON.parse(personalizedQuestion.result.messages[1].text);
  }

  async personalizesProductOptions(
    options: ProfileOptionsEntity[],
    previousQuestions: ProductQuestionEntity[],
    previousResponses: PreviousResponsesEntity[]
  ): Promise<ProfileOptionsEntity[]> {
    const context = this.contextService.buildContext(previousQuestions, previousResponses, 'product');
    const personalizedOptions = await this.personalizeProductOptions(options, context);
    return JSON.parse(personalizedOptions.result.messages[1].text).options;
  }

  private async personalizeProfileQuestion(
    question: ProfileQuestionEntity,
    context: AbacusContextEntity
  ) {

    const payload = createPayload([
      {
        is_user: true,
        text: `
          context:${JSON.stringify(context)},
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
        context
      });
      throw error;
    }
  }

  private async personalizeBfiQuestion(
    question: BfiQuestionEntity,
    context: AbacusContextEntity
  ) {

    const payload = createPayload([
      {
        is_user: true,
        text: `
          context:${JSON.stringify(context)},
          question:
            {"id":${question.id},
            "variable:${question.variable},
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
        context
      });
      throw error;
    }
  }

  private async personalizeProductQuestion(
    question: ProductQuestionEntity,
    context: AbacusContextEntity
  ) {

    const payload = createPayload([
      {
        is_user: true,
        text: `
          context:${JSON.stringify(context)},
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
        context
      });
      throw error;
    }
  }

  private async personalizeProfileOptions(
    options: ProfileOptionsEntity[],
    context: AbacusContextEntity
  ) {

    const payload = createPayload([
      {
        is_user: true,
        text: `
          context:${JSON.stringify(context)},
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
        context
      });
      throw error;
    }
  }

  private async personalizeBfiOptions(
    options: BfiOptionsEntity[],
    context: AbacusContextEntity
  ) {

    const payload = createPayload([
      {
        is_user: true,
        text: `
          context:${JSON.stringify(context)},
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
        context
      });
      throw error;
    }
  }

  private async personalizeProductOptions(
    options: ProductOptionsEntity[],
    context: AbacusContextEntity
  ) {

    const payload = createPayload([
      {
        is_user: true,
        text: `
          context:${JSON.stringify(context)},
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
        context
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