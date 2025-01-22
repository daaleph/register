// backend/src/questions/profile-questions/profile-questions.service.ts

import { Injectable } from '@nestjs/common';
import { ProfileQuestionsRepository } from '../../repositories/profile-questions';
import { AbacusPersonalizationService } from '../../abacus/personalization.service';
import { ProfileQuestionsEntity, ProfileOptionsEntity } from '../../entities';

@Injectable()
export class ProfileQuestionsService {
  constructor(
    private readonly profileQuestionsRepository: ProfileQuestionsRepository,
    private readonly abacusPersonalizationService: AbacusPersonalizationService
  ) {}

  async getInitialQuestion(): Promise<ProfileQuestionsEntity> {
    return this.profileQuestionsRepository.findQuestion(1);
  }

  async getInitialOptions(): Promise<ProfileOptionsEntity[]> {
    return this.profileQuestionsRepository.findOptions(1);
  }

  async getQuestionById(id: number): Promise<ProfileQuestionsEntity> {
    return this.profileQuestionsRepository.findQuestion(id);
  }

  async getOptionsById(id: number): Promise<ProfileOptionsEntity[]> {
    return this.profileQuestionsRepository.findOptions(id);
  }

  async getContextualizedQuestionById(uuid: string, id: number): Promise<ProfileQuestionsEntity> {
    const question: ProfileQuestionsEntity = await this.getQuestionById(id);
    const previousQuestions = await this.profileQuestionsRepository.getPreviousQuestions(id);
    const previousResponses = await this.profileQuestionsRepository.getPreviousResponses(uuid, id);
    const personalizedQuestion = await this.abacusPersonalizationService.personalizesProfileQuestion(question, previousQuestions, previousResponses);
    question.description_en = personalizedQuestion.description_en;
    question.description_es = personalizedQuestion.description_es;
    return question;
  }

  async getContextualizedOptionsById(uuid: string, id: number): Promise<ProfileOptionsEntity[]> {
    const options: ProfileOptionsEntity[] = await this.getOptionsById(id);
    const previousQuestions = await this.profileQuestionsRepository.getPreviousQuestions(id);
    const previousResponses = await this.profileQuestionsRepository.getPreviousResponses(uuid, id);
    return await this.abacusPersonalizationService.personalizesProfileOptions(options, previousQuestions, previousResponses, id);
  }

}