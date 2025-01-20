import { Injectable } from '@nestjs/common';
import { ProfileQuestionsEntity, ProfileResponsesEntity } from 'src/entities';

@Injectable()
export class AbacusContextService {
  buildContext(
    previousQuestions: ProfileQuestionsEntity[],
    previousResponses: ProfileResponsesEntity[],
    questionType: string
  ): { [key: string]: any } {
    const context = previousQuestions.reduce((acc, question) => {
      const response = previousResponses.find(resp => resp.variable === question.variable);
      acc[question.variable] = {
        type: question.type,
        name: question.name_es,
        description: question.description_en,
        answer: response ? response.answer_options : undefined
      };
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