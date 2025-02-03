// backend/src/responses/profile/controller.ts
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Service } from './service';
import { RateLimitGuard } from 'src/guards/rateLimit';

@Controller('responses/profile')
export class ProfileResponsesController {
  constructor(private readonly responsesService: Service) {}

  @Post()
  @UseGuards(RateLimitGuard)
  async submitAnswer(
    @Body('profileId') profileId: string,
    @Body('variable') variable: string,
    @Body('answer') answer: number[] | number,
  ): Promise<void> {
    await this.responsesService.saveAnswerOfSpecificQuestion(
      profileId,
      variable,
      Array.isArray(answer) ? answer : [answer],
    );
  }

  @Post('other')
  @UseGuards(RateLimitGuard)
  async submitOtherAnswer(
    @Body('profileId') profileId: string,
    @Body('variable') variable: string,
    @Body('answer') answer: string,
  ): Promise<void> {
    await this.responsesService.saveOtherAnswerOfSpecificQuestion(
      profileId,
      variable,
      answer,
    );
  }
}
