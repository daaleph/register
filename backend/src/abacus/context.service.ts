// src/abacus/context.service.ts

import { Injectable } from '@nestjs/common';
import { ProfileQuestionEntity, PreviousResponsesEntity, BfiQuestionEntity, ProductQuestionEntity } from 'src/entities';
import { AbacusContextEntity } from 'src/entities/abacus-context';
import { AbacusContext } from 'src/types/abacus.types';

type QuestionEntity = ProfileQuestionEntity | BfiQuestionEntity | ProductQuestionEntity;
type QuestionType = 'profile' | 'bfi' | 'product' | 'unknown';

interface ContextBuilder {
  buildQuestionContext(
    question: QuestionEntity, 
    varIndex: number,
    response: PreviousResponsesEntity | undefined,
  ): Partial<AbacusContext>;
}

@Injectable()
export class AbacusContextService {
  private readonly contextBuilders: Map<QuestionType, ContextBuilder>;
  
  constructor() {
    this.contextBuilders = new Map([
      ['profile', new ProfileContextBuilder()],
      ['bfi', new BfiContextBuilder()],
      ['product', new ProductContextBuilder()]
    ]);
  }

  private buildQuestionContext(
    questions: QuestionEntity[],
    responses: PreviousResponsesEntity[],
    questionType: QuestionType
  ): AbacusContext {
    const contextBuilder = this.contextBuilders.get(questionType) || new DefaultContextBuilder();
    
    return questions.reduce((acc, question, index) => {
      const response = responses.find(resp => resp.variable === question.variable);
      const context = contextBuilder.buildQuestionContext(question, index + 1, response);
      return { ...acc, ...context };
    }, {} as AbacusContext);
  }

  buildContext(
    previousQuestions: QuestionEntity[],
    previousResponses: PreviousResponsesEntity[],
    questionType: string
  ): AbacusContextEntity {
    const validatedType = this.validateQuestionType(questionType);
    const context = this.buildQuestionContext(previousQuestions, previousResponses, validatedType);

    return {
      type: validatedType,
      context,
      order: previousQuestions.length + 1
    };
  }

  private validateQuestionType(type: string): QuestionType {
    return ['profile', 'bfi', 'product'].includes(type) ? type as QuestionType : 'unknown';
  }
}

class ProfileContextBuilder implements ContextBuilder {
  buildQuestionContext(
    question: ProfileQuestionEntity, 
    varIndex: number,
    response?: PreviousResponsesEntity
  ): Partial<AbacusContext> {
    if (!response) return {};
    
    return {
      [`var${varIndex}`]: {
        type: question.type as 'multiple' | 'unique',
        name_en: question.name_en,
        name_es: question.name_es,
        description_en: question.description_en,
        description_es: question.description_es,
        answer_es: response.answer_options_es,
        answer_en: response.answer_options_en
      }
    };
  }
}

class BfiContextBuilder implements ContextBuilder {
  buildQuestionContext(
    question: BfiQuestionEntity, 
    varIndex: number,
    response?: PreviousResponsesEntity
  ): Partial<AbacusContext> {
    if (!response) return {};
    
    return {
      [`var${varIndex}`]: {
        description_en: question.description_en,
        description_es: question.description_es,
        answer_es: response.answer_options_es,
        answer_en: response.answer_options_en
      }
    };
  }
}

class ProductContextBuilder implements ContextBuilder {
  buildQuestionContext(
    question: ProductQuestionEntity,
    varIndex: number,
    response?: PreviousResponsesEntity,
  ): Partial<AbacusContext> {
    if (!response) return {};
    
    return {
      [`var${varIndex}`]: {
        type: question.type as 'multiple' | 'unique',
        name_en: question.name_en,
        name_es: question.name_es,
        description_en: question.description_en,
        description_es: question.description_es,
        answer_es: response.answer_options_es,
        answer_en: response.answer_options_en
      }
    };
  }
}

class DefaultContextBuilder implements ContextBuilder {
  buildQuestionContext(
    question: QuestionEntity,
    varIndex: number,
    response?: PreviousResponsesEntity,
  ): Partial<AbacusContext> {
    if (!response) return {};
    
    return {
      [`var${varIndex}`]: {
        description_en: question.description_en,
        description_es: question.description_es,
        answer_es: response.answer_options_es,
        answer_en: response.answer_options_en
      }
    };
  }
}