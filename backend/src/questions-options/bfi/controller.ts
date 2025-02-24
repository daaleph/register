// backend/src/questions-options/bfi/controller.ts
import { Controller, Get, Param, UseGuards, Body } from '@nestjs/common';
import { BfiQuestionsService } from './service';
import { RateLimitGuard } from 'src/guards/rateLimit';

@Controller('questions/bfi')
export class BfiQuestionsController {
  constructor(private readonly service: BfiQuestionsService) {}

  @Get('initial')
  @UseGuards(RateLimitGuard)
  async getInitialQuestionWithOptions(
    @Body('profileId') profileId: string,
  ): Promise<string> {
    const question = await this.service.getContextualizedInitialQuestion(profileId);
    const options = await this.service.getContextualizedInitialOptions(profileId);
    return JSON.stringify({ question, options });
  }

  @Get('questionId/:questionId')
  @UseGuards(RateLimitGuard)
  async getProfiledQuestionWithOptions(
    @Body('profileId') profileId: string,
    @Param('questionId') questionId: number,
  ): Promise<string> {
    const question = await this.service.getContextualizedQuestionById(
      profileId,
      questionId,
    );
    const options = await this.service.getContextualizedOptionsById(
      profileId,
      questionId,
    );
    return JSON.stringify({ question, options });
  }
}
