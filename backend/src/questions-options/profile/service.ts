// src/questions/profile-questions/profile-questions.service.ts

import { Injectable } from '@nestjs/common';
import { ProfileQuestionsRepository } from '../../repositories/profile-questions.repository';
import { AbacusPersonalizationService } from '../../abacus/abacus-personalization.service';
import { ProfileQuestionsEntity } from '../../entities/profile-questions.entity';
import { ProfileResponsesEntity } from '../../entities/profile-responses.entity';
import { ProfileOptionsEntity } from 'src/entities/profile-options.entity';

@Injectable()
export class ProfileQuestionsService {
  constructor(
    private readonly profileQuestionsRepository: ProfileQuestionsRepository,
    private readonly abacusPersonalizationService: AbacusPersonalizationService
  ) {}

  async getInitialQuestion(): Promise<ProfileQuestionsEntity> {
    return this.profileQuestionsRepository.findQuestion(1);
  }

  async getInitialOptions(): Promise<ProfileOptionsEntity> {
    return this.profileQuestionsRepository.findOptions(1);
  }

  async getQuestionById(id: number): Promise<ProfileQuestionsEntity> {
    return this.profileQuestionsRepository.findQuestion(id);
  }

  async getOptionsById(id: number): Promise<ProfileOptionsEntity> {
    return this.profileQuestionsRepository.findOptions(id);
  }

  // async handleProfileAnswer(
  //   questionId: number,
  //   profileId: string,
  //   variable: string,
  //   answer: number[] | number
  // ): Promise<{nextQuestion: ProfileQuestionsEntity, response: ProfileResponsesEntity}> {

  //   const response = await this.storeAnswer(
  //     profileId,
  //     variable,
  //     answer,
  //     new Date()
  //   );

  //   const nextQuestion = await this.getNextQuestion(questionId, answer);

  //   return {
  //     nextQuestion,
  //     response
  //   };
  // }

  // async getNextQuestion(currentId: number, previousAnswer: number[] | number): Promise<ProfileQuestionsEntity> {
  //   // For questions 2-6, use conditional logic based on first question's answer
  //   if (currentId < 7) {
  //     return this.profileQuestionsRepository.findNextQuestionBasedOnAnswer(currentId, previousAnswer);
  //   }
    
  //   // For questions 7 and beyond, use ABACUS.AI personalization
  //   const previousResponses = await this.profileQuestionsRepository.getPreviousResponses(currentId);
  //   const personalizedQuestion = await this.abacusPersonalizationService.personalizesProfileQuestion(
  //     currentId,
  //     previousResponses
  //   );

  //   return this.profileQuestionsRepository.findAndCustomizeQuestion(currentId, personalizedQuestion);
  // }

  // async storeAnswer(
  //   profileId: string,
  //   variable: string,
  //   answer: number[] | number,
  //   dateAnswer: Date
  // ): Promise<ProfileResponsesEntity> {
  //   return this.profileQuestionsRepository.saveProfileResponse({
  //     profile: profileId,
  //     variable,
  //     answerOptions: Array.isArray(answer) ? answer : [answer],
  //     dateAnswer: dateAnswer
  //   });
  // }
}