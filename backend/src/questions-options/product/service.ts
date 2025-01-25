// src/questions-options/product/service.ts
import { Injectable } from '@nestjs/common';
import { ProductQuestionsRepository } from '../../repositories/questions/product';
import { AbacusPersonalizationService } from '../../abacus/personalization.service';
import { BfiQuestionsRepository, ProfileQuestionsRepository } from 'src/repositories/questions';
import { ProductOptionEntity, ProductQuestionEntity } from 'src/entities';

@Injectable()
export class ProductQuestionsService {
  constructor(
    private readonly profileRepository: ProfileQuestionsRepository,
    private readonly bfiRepository: BfiQuestionsRepository,
    private readonly repository: ProductQuestionsRepository,
    private readonly personalizationService: AbacusPersonalizationService
  ) {}

  async getContextualizedInitialQuestion(uuid: string): Promise<ProductQuestionEntity> {
    const profileQuestions = await this.profileRepository.getAllQuestions();
    const profileResponses = await this.profileRepository.getAllResponses(uuid);
    const bfiQuestions = await this.bfiRepository.getAllQuestions();
    const bfiResponses = await this.bfiRepository.getAllResponses(uuid);
    const currentQuestion = await this.repository.findQuestion(1);
    const personalizedQuestion = await this.personalizationService.personalizesBfiQuestion(
      currentQuestion,
      { profile: profileQuestions, bfi: bfiQuestions },
      { profile: profileResponses, bfi: bfiResponses }
    );
    currentQuestion.description_en = personalizedQuestion.description_en;
    currentQuestion.description_es = personalizedQuestion.description_es;
    return currentQuestion;
  }

  async getContextualizedInitialOptions(uuid: string): Promise<ProductOptionEntity[]> {
    const profileQuestions = await this.profileRepository.getAllQuestions();
    const profileResponses = await this.profileRepository.getAllResponses(uuid);
    const bfiQuestions = await this.bfiRepository.getAllQuestions();
    const bfiResponses = await this.bfiRepository.getAllResponses(uuid);
    const currentOptions = await this.repository.findOptions(1);
    const personalizedOptions = await this.personalizationService.personalizesBfiOptions(
      currentOptions,
      { profile: profileQuestions, bfi: bfiQuestions },
      { profile: profileResponses, bfi: bfiResponses }
    );
    currentOptions.map((currentOption, index) => {
      currentOption.description_en = personalizedOptions[index].description_en;
      currentOption.description_es = personalizedOptions[index].description_es;
    })
    return currentOptions;
  }

  async getContextualizedQuestionById(uuid: string, id: number): Promise<ProductQuestionEntity> {
    const profileQuestions = await this.profileRepository.getAllQuestions();
    const profileResponses = await this.profileRepository.getAllResponses(uuid);
    const previousQuestions = await this.repository.getPreviousQuestions(id);
    const previousResponses = await this.repository.getPreviousResponses(uuid, id);
    const currentQuestion = await this.getQuestionById(id);
    const personalizedQuestion = await this.personalizationService.personalizesBfiQuestion(
      currentQuestion,
      { profile: profileQuestions, bfi: previousQuestions },
      { profile: profileResponses, bfi: previousResponses }
    );
    currentQuestion.description_en = personalizedQuestion.description_en;
    currentQuestion.description_es = personalizedQuestion.description_es;
    return currentQuestion;
  }

  async getContextualizedOptionsById(uuid: string, id: number): Promise<ProductOptionEntity[]> {
    const profileQuestions = await this.profileRepository.getAllQuestions();
    const profileResponses = await this.profileRepository.getAllResponses(uuid);
    const previousQuestions = await this.repository.getPreviousQuestions(id);
    const previousResponses = await this.repository.getPreviousResponses(uuid, id);
    const currentOptions = await this.getOptionsById(1);
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

  async getQuestionById(id: number): Promise<ProductQuestionEntity> {
    return this.repository.findQuestion(id);
  }

  async getOptionsById(id: number): Promise<ProductOptionEntity[]> {
    return this.repository.findOptions(id);
  }

}