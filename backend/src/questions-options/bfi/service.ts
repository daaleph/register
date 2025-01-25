// src/questions-options/bfi/service.ts
import { Injectable } from '@nestjs/common';
import { AbacusPersonalizationService } from '../../abacus/personalization.service';
import { BfiQuestionEntity, BfiOptionEntity } from '../../entities';
import { BfiQuestionsRepository, ProfileQuestionsRepository } from 'src/repositories/questions';

@Injectable()
export class BfiQuestionsService {
  constructor(
    private readonly repository: BfiQuestionsRepository,
    private readonly profileRepository: ProfileQuestionsRepository,
    private readonly personalizationService: AbacusPersonalizationService
  ) {}

  async getContextualizedInitialQuestion(uuid: string): Promise<BfiQuestionEntity> {
    const profileQuestions = await this.profileRepository.getAllQuestions();
    const profileResponses = await this.profileRepository.getAllResponses(uuid);
    const currentQuestion = await this.repository.findQuestion(1);
    const personalizedQuestion = await this.personalizationService.personalizesBfiQuestion(
      currentQuestion,
      { profile: profileQuestions },
      { profile: profileResponses }
    );
    currentQuestion.description_en = personalizedQuestion.description_en;
    currentQuestion.description_es = personalizedQuestion.description_es;
    return currentQuestion;
  }

  async getContextualizedInitialOptions(uuid: string): Promise<BfiOptionEntity[]> {
    const profileQuestions = await this.profileRepository.getAllQuestions();
    const profileResponses = await this.profileRepository.getAllResponses(uuid);
    const currentOptions = await this.repository.findOptions();
    const personalizedOptions = await this.personalizationService.personalizesBfiOptions(
      currentOptions,
      { profile: profileQuestions },
      { profile: profileResponses }
    );
    currentOptions.map((currentOption, index) => {
      currentOption.description_en = personalizedOptions[index].description_en;
      currentOption.description_es = personalizedOptions[index].description_es;
    })
    return currentOptions;
  }

  async getContextualizedQuestionById(uuid: string, id: number): Promise<BfiQuestionEntity> {
    const profileQuestions = await this.profileRepository.getAllQuestions();
    const profileResponses = await this.profileRepository.getAllResponses(uuid);
    const currentQuestion = await this.getQuestionById(id);
    const previousQuestions = await this.repository.getPreviousQuestions(id);
    const previousResponses = await this.repository.getPreviousResponses(uuid, id);
    const personalizedQuestion = await this.personalizationService.personalizesBfiQuestion(
      currentQuestion,
      { profile: profileQuestions, bfi: previousQuestions },
      { profile: profileResponses, bfi: previousResponses }
    );
    currentQuestion.description_en = personalizedQuestion.description_en;
    currentQuestion.description_es = personalizedQuestion.description_es;
    return currentQuestion;
  }

  async getContextualizedOptionsById(uuid: string, id: number): Promise<BfiOptionEntity[]> {
    const profileQuestions = await this.profileRepository.getAllQuestions();
    const profileResponses = await this.profileRepository.getAllResponses(uuid);
    const currentOptions = await this.getOptionsById();
    const previousQuestions = await this.repository.getPreviousQuestions(id);
    const previousResponses = await this.repository.getPreviousResponses(uuid, id);
    const personalizedOptions =  this.personalizationService.personalizesBfiOptions(
      currentOptions,
      { profile: profileQuestions, bfi: previousQuestions },
      { profile: profileResponses, bfi: previousResponses }
    );
    currentOptions.map((currentOption, index) => {
      currentOption.description_en = personalizedOptions[index].description_en;
      currentOption.description_es = personalizedOptions[index].description_es;
    })
    return currentOptions;
  }

  async getQuestionById(id: number): Promise<BfiQuestionEntity> {
    return this.repository.findQuestion(id);
  }

  async getOptionsById(): Promise<BfiOptionEntity[]> {
    return this.repository.findOptions();
  }

}