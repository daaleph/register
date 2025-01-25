// backend/src/questions-options/profile/service.ts

import { Injectable } from '@nestjs/common';
import { ProfileQuestionsRepository } from '../../repositories/questions/profile';
import { AbacusPersonalizationService } from '../../abacus/personalization.service';
import { ProfileQuestionEntity, ProfileOptionEntity } from '../../entities';

@Injectable()
export class ProfileQuestionsService {
  constructor(
    private readonly repository: ProfileQuestionsRepository,
    private readonly abacusPersonalizationService: AbacusPersonalizationService
  ) {}

  async getInitialQuestion(): Promise<ProfileQuestionEntity> {
    return this.repository.findQuestion(1);
  }

  async getInitialOptions(): Promise<ProfileOptionEntity[]> {
    return this.repository.findOptions(1);
  }

  async getContextualizedQuestionById(uuid: string, id: number): Promise<ProfileQuestionEntity> {
    const question: ProfileQuestionEntity = await this.getQuestionById(id);
    const previousQuestions = await this.repository.getPreviousQuestions(id);
    const previousResponses = await this.repository.getPreviousResponses(uuid, id);
    const personalizedQuestion = await this.abacusPersonalizationService.personalizesProfileQuestion(question, previousQuestions, previousResponses);
    question.description_en = personalizedQuestion.description_en;
    question.description_es = personalizedQuestion.description_es;
    return question;
  }

  async getContextualizedOptionsById(uuid: string, id: number): Promise<ProfileOptionEntity[]> {
    const options: ProfileOptionEntity[] = await this.getOptionsById(id);
    const previousQuestions = await this.repository.getPreviousQuestions(id);
    const previousResponses = await this.repository.getPreviousResponses(uuid, id);
    return await this.abacusPersonalizationService.personalizesProfileOptions(options, previousQuestions, previousResponses);
  }

  async getQuestionById(id: number): Promise<ProfileQuestionEntity> {
    return this.repository.findQuestion(id);
  }

  async getOptionsById(id: number): Promise<ProfileOptionEntity[]> {
    return this.repository.findOptions(id);
  }

}