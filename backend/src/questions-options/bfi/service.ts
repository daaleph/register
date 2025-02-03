// backend/src/questions-options/bfi/service.ts
import { Injectable } from '@nestjs/common';
import { AbacusPersonalizationService } from '../../abacus/personalization.service';
import { BfiQuestionEntity, BfiOptionEntity } from '../../entities';
import {
  BfiQuestionsRepository,
  ProfileQuestionsRepository,
} from 'src/repositories/questions';

@Injectable()
export class BfiQuestionsService {
  constructor(
    private readonly repository: BfiQuestionsRepository,
    private readonly profileRepository: ProfileQuestionsRepository,
    private readonly personalizationService: AbacusPersonalizationService,
  ) {}

  async getContextualizedInitialQuestion(
    uuid: string,
  ): Promise<BfiQuestionEntity> {
    const profileQuestions = await this.profileRepository.getAllQuestions();
    const profileResponses = await this.profileRepository.getAllResponses(uuid);
    const question: BfiQuestionEntity = await this.repository.findQuestion(1);
    const personalizedQuestion =
      await this.personalizationService.personalizesBfiQuestion(
        question,
        { profile: profileQuestions },
        { profile: profileResponses },
      );
    question.description_en = personalizedQuestion.description_en;
    question.description_es = personalizedQuestion.description_es;
    return question;
  }

  async getContextualizedInitialOptions(
    uuid: string,
  ): Promise<BfiOptionEntity[]> {
    const profileQuestions = await this.profileRepository.getAllQuestions();
    const profileResponses = await this.profileRepository.getAllResponses(uuid);
    const options: BfiOptionEntity[] = await this.repository.findOptions();
    const personalizedOptions =
      await this.personalizationService.personalizesBfiOptions(
        options,
        { profile: profileQuestions },
        { profile: profileResponses },
      );
    options.map((currentOption, index) => {
      currentOption.description_en = personalizedOptions[index].description_en;
      currentOption.description_es = personalizedOptions[index].description_es;
    });
    return options;
  }

  async getContextualizedQuestionById(
    uuid: string,
    id: number,
  ): Promise<BfiQuestionEntity> {
    const question = await this.getQuestionById(id);
    const previousQuestions = await this.repository.getPreviousQuestions(id);
    const previousResponses = await this.repository.getPreviousResponses(
      uuid,
      id,
    );
    const personalizedQuestion =
      await this.personalizationService.personalizesBfiQuestion(
        question,
        {
          profile: previousQuestions.profileQuestions,
          bfi: previousQuestions.bfiQuestions,
        },
        {
          profile: previousResponses.profileResponses,
          bfi: previousResponses.bfiResponses,
        },
      );
    question.description_en = personalizedQuestion.description_en;
    question.description_es = personalizedQuestion.description_es;
    return question;
  }

  async getContextualizedOptionsById(
    uuid: string,
    id: number,
  ): Promise<BfiOptionEntity[]> {
    const options = await this.getOptionsById();
    const previousQuestions = await this.repository.getPreviousQuestions(id);
    const previousResponses = await this.repository.getPreviousResponses(
      uuid,
      id,
    );
    const personalizedOptions =
      await this.personalizationService.personalizesBfiOptions(
        options,
        {
          profile: previousQuestions.profileQuestions,
          bfi: previousQuestions.bfiQuestions,
        },
        {
          profile: previousResponses.profileResponses,
          bfi: previousResponses.bfiResponses,
        },
      );
    options.map((currentOption, index) => {
      currentOption.description_en = personalizedOptions[index].description_en;
      currentOption.description_es = personalizedOptions[index].description_es;
    });
    return options;
  }

  async getQuestionById(id: number): Promise<BfiQuestionEntity> {
    return this.repository.findQuestion(id);
  }

  async getOptionsById(): Promise<BfiOptionEntity[]> {
    return this.repository.findOptions();
  }
}
