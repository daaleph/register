// src/questions-options/bfi/controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { BfiQuestionsService } from './service';

@Controller('questions/bfi/:uuid')
export class BfiQuestionsController {
  constructor(
    private readonly service: BfiQuestionsService
  ) {}

  @Get('initial')
  async getInitialProfileQuestion(): Promise<string> {
      const question = await this.service.getInitialQuestion();
      const options = await this.service.getInitialOptions();
      return JSON.stringify({ question, options });
  }

  @Get('questionId/:questionId')
  async getProfiledQuestion(
      @Param('uuid') uuid: string,
      @Param('questionId') questionId: number
  ): Promise<string> {
      const question = await this.service.getContextualizedQuestionById(uuid, questionId);
      const options = await this.service.getContextualizedOptionsById(uuid, questionId);
      return JSON.stringify({ question, options });
  }

}