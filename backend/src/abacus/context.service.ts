// backend/src/abacus/context.service.ts

import { Injectable } from '@nestjs/common';
import {
  ProfileQuestionEntity,
  PreviousResponsesEntity,
  BfiQuestionEntity,
  ProductQuestionEntity,
} from 'src/entities';
import { AbacusContextEntity } from 'src/entities/abacus-context';
import { AbacusContext } from 'src/types/abacus.types';

type QuestionEntity =
  | ProfileQuestionEntity
  | BfiQuestionEntity
  | ProductQuestionEntity;
type QuestionType = 'profile' | 'bfi' | 'product' | 'unknown';

interface ContextBuilder {
  buildQuestionContext(
    questions: QuestionEntity[],
    responses: PreviousResponsesEntity[],
    varIndexStart: number,
  ): Partial<AbacusContext>;
}

@Injectable()
export class AbacusContextService {
  private readonly contextBuilders: Map<QuestionType, ContextBuilder>;

  constructor() {
    this.contextBuilders = new Map([
      ['profile', new ProfileContextBuilder()],
      ['bfi', new BfiContextBuilder()],
      ['product', new ProductContextBuilder()],
    ]);
  }

  buildContext(
    questions: {
      profile?: ProfileQuestionEntity[];
      bfi?: BfiQuestionEntity[];
      product?: ProductQuestionEntity[];
    },
    responses: {
      profile?: PreviousResponsesEntity[];
      bfi?: PreviousResponsesEntity[];
      product?: PreviousResponsesEntity[];
    },
    questionType: string,
  ): AbacusContextEntity {
    const validatedType = this.validateQuestionType(questionType);
    const context = this.buildQuestionContext(questions, responses);
    return {
      type: validatedType,
      context,
      order: this.calculateTotalQuestions(questions),
    };
  }

  private buildQuestionContext(
    questions: {
      profile?: ProfileQuestionEntity[];
      bfi?: BfiQuestionEntity[];
      product?: ProductQuestionEntity[];
    },
    responses: {
      profile?: PreviousResponsesEntity[];
      bfi?: PreviousResponsesEntity[];
      product?: PreviousResponsesEntity[];
    },
  ): AbacusContext {
    let context = {} as AbacusContext;
    let varIndexStart = 1;

    if (questions.profile && responses.profile) {
      const profileBuilder = this.contextBuilders.get(
        'profile',
      ) as ProfileContextBuilder;
      context = {
        ...context,
        ...profileBuilder.buildQuestionContext(
          questions.profile,
          responses.profile,
          varIndexStart,
        ),
      };
      varIndexStart += questions.profile.length;
    }

    if (questions.bfi && responses.bfi) {
      const bfiBuilder = this.contextBuilders.get('bfi') as BfiContextBuilder;
      context = {
        ...context,
        ...bfiBuilder.buildQuestionContext(
          questions.bfi,
          responses.bfi,
          varIndexStart,
        ),
      };
      varIndexStart += questions.bfi.length;
    }

    if (questions.product && responses.product) {
      const productBuilder = this.contextBuilders.get(
        'product',
      ) as ProductContextBuilder;
      context = {
        ...context,
        ...productBuilder.buildQuestionContext(
          questions.product,
          responses.product,
          varIndexStart,
        ),
      };
    }

    return context;
  }

  private calculateTotalQuestions(questions: {
    profile?: QuestionEntity[];
    bfi?: QuestionEntity[];
    product?: QuestionEntity[];
  }): number {
    return (
      (questions.profile?.length || 0) +
      (questions.bfi?.length || 0) +
      (questions.product?.length || 0)
    );
  }

  private validateQuestionType(type: string): QuestionType {
    return ['profile', 'bfi', 'product'].includes(type)
      ? (type as QuestionType)
      : 'unknown';
  }
}

class ProfileContextBuilder implements ContextBuilder {
  buildQuestionContext(
    questions: ProfileQuestionEntity[],
    responses: PreviousResponsesEntity[],
    varIndexStart: number,
  ): Partial<AbacusContext> {
    return questions.reduce((acc, question, index) => {
      const response = responses.find(
        (resp) => resp.variable === question.variable,
      );
      if (!response) return acc;
      return {
        ...acc,
        [`var${varIndexStart + index}`]: {
          type: question.type as 'multiple' | 'unique',
          name_en: question.name_en,
          name_es: question.name_es,
          description_en: question.description_en,
          description_es: question.description_es,
          answer_es: response.answer_options_es,
          answer_en: response.answer_options_en,
        },
      };
    }, {} as Partial<AbacusContext>);
  }
}

class BfiContextBuilder implements ContextBuilder {
  buildQuestionContext(
    questions: BfiQuestionEntity[],
    responses: PreviousResponsesEntity[],
    varIndexStart: number,
  ): Partial<AbacusContext> {
    return questions.reduce((acc, question, index) => {
      const response = responses.find(
        (resp) => resp.variable === question.variable,
      );
      if (!response) return acc;
      return {
        ...acc,
        [`var${varIndexStart + index}`]: {
          description_en: question.description_en,
          description_es: question.description_es,
          answer_es: response.answer_options_es,
          answer_en: response.answer_options_en,
        },
      };
    }, {} as Partial<AbacusContext>);
  }
}

class ProductContextBuilder implements ContextBuilder {
  buildQuestionContext(
    questions: ProductQuestionEntity[],
    responses: PreviousResponsesEntity[],
    varIndexStart: number,
  ): Partial<AbacusContext> {
    return questions.reduce((acc, question, index) => {
      const response = responses.find(
        (resp) => resp.variable === question.variable,
      );
      if (!response) return acc;
      return {
        ...acc,
        [`var${varIndexStart + index}`]: {
          type: question.type as 'multiple' | 'unique',
          name_en: question.name_en,
          name_es: question.name_es,
          description_en: question.description_en,
          description_es: question.description_es,
          answer_es: response.answer_options_es,
          answer_en: response.answer_options_en,
        },
      };
    }, {} as Partial<AbacusContext>);
  }
}
