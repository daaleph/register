// src/questions/profile-questions/profile-questions.service.ts

import { Injectable } from '@nestjs/common';
import { ProfileQuestionsRepository } from '../../repositories/profile-questions';
import { AbacusPersonalizationService } from '../../abacus/personalization.service';
import { ProfileQuestionsEntity } from '../../entities/profile-questions';
import { ProfileResponsesEntity } from '../../entities/profile-responses';
import { ProfileOptionsEntity } from 'src/entities/profile-options';

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

  async getContextualizedQuestionById(id: number): Promise<ProfileQuestionsEntity> {
    let question: ProfileQuestionsEntity = await this.getQuestionById(id);
    const previousQuestions = await this.profileQuestionsRepository.getPreviousQuestions(id);
    const previousResponses = await this.profileQuestionsRepository.getPreviousResponses(id);
    return await this.abacusPersonalizationService.personalizesProfileQuestion(question, previousQuestions, previousResponses);
  }

  async getContextualizedOptionsById(id: number): Promise<ProfileOptionsEntity[]> {
    let options: ProfileOptionsEntity[] = await this.getOptionsById(id);
    const previousQuestions = await this.profileQuestionsRepository.getPreviousQuestions(id);
    const previousResponses = await this.profileQuestionsRepository.getPreviousResponses(id);
    return await this.abacusPersonalizationService.personalizesProfileOptions(options, previousQuestions, previousResponses);
  }

}