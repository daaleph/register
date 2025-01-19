// src/abacus/abacus-context.service.ts
import { Injectable } from '@nestjs/common';

export interface QuestionContext {
  question: string;
  answer: any;
  order: number;
}

@Injectable()
export class AbacusContextService {
  buildContext(previousResponses: any[], questionType: string) {
    return previousResponses.map((resp, index) => ({
      question: resp.question,
      answer: resp.answer,
      order: index + 1
    }));
  }
}