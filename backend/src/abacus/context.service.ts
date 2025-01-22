// src/abacus/context.ts

import { Injectable } from '@nestjs/common';
import { ProfileQuestionsEntity, ProfilePreviousResponsesEntity } from 'src/entities';
import { AbacusContextEntity } from 'src/entities/abacus-context';

@Injectable()
export class AbacusContextService {
  buildContext(
    previousQuestions: ProfileQuestionsEntity[],
    previousResponses: ProfilePreviousResponsesEntity[],
    questionType: string
  ): AbacusContextEntity {
    const context = previousQuestions.reduce((acc, question) => {
      const response = previousResponses.find(resp => resp.variable === question.variable);
      response ? acc[question.variable] = {
        type: question.type,
        name_en: question.name_en,
        name_es: question.name_es,
        description_en: question.description_en,
        description_es: question.description_es,
        answer_es: response.answer_options_es,
        answer_en: response.answer_options_en
      }: null;
      return acc;
    }, {});
    switch (questionType) {
      case 'profile':
        return {
          type: 'profile',
          context: context,
          order: previousQuestions.length + 1
        };
      case 'bfi':
        return {
          type: 'bfi',
          context: context,
          order: previousQuestions.length + 1
        };
      case 'product':
        return {
          type: 'product', 
          context: context,
          order: previousQuestions.length + 1
        };
      default:
        return {
          type: 'unknown',
          context: context,
          order: previousQuestions.length + 1
        };
    }
  }
}