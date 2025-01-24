// src/questions-options/bfi/service.ts
import { Injectable } from '@nestjs/common';
import { BfiQuestionsRepository } from '../../repositories/questions/bfi';
import { AbacusPersonalizationService } from '../../abacus/personalization.service';
import { BfiQuestionEntity, BfiOptionsEntity } from '../../entities';

@Injectable()
export class BfiQuestionsService {
  constructor(
    private readonly repository: BfiQuestionsRepository,
    private readonly abacusPersonalizationService: AbacusPersonalizationService
  ) {}

  async getInitialQuestion(): Promise<BfiQuestionEntity> {
    return this.repository.findQuestion(1);
  }

  async getInitialOptions(): Promise<BfiOptionsEntity[]> {
    return this.repository.findOptions(1);
  }

  async getQuestionById(id: number): Promise<BfiQuestionEntity> {
    return this.repository.findQuestion(id);
  }

  async getOptionsById(id: number): Promise<BfiOptionsEntity[]> {
    return this.repository.findOptions(id);
  }

  async getContextualizedQuestionById(uuid: string, id: number): Promise<BfiQuestionEntity> {
    const question: BfiQuestionEntity = await this.getQuestionById(id);
    const previousQuestions = await this.repository.getPreviousQuestions(id);
    const previousResponses = await this.repository.getPreviousResponses(uuid, id);
    const personalizedQuestion = await this.abacusPersonalizationService.personalizesBfiQuestion(question, previousQuestions, previousResponses);
    question.description_en = personalizedQuestion.description_en;
    question.description_es = personalizedQuestion.description_es;
    return question;
  }

  async getContextualizedOptionsById(uuid: string, id: number): Promise<BfiOptionsEntity[]> {
    const options: BfiOptionsEntity[] = await this.getOptionsById(id);
    const previousQuestions = await this.repository.getPreviousQuestions(id);
    const previousResponses = await this.repository.getPreviousResponses(uuid, id);
    return await this.abacusPersonalizationService.personalizesBfiOptions(options, previousQuestions, previousResponses, id);
  }

}