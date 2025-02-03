// backend/src/responses/bfi/controller.ts
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Service } from './service';
import { RateLimitGuard } from 'src/guards/rateLimit';

@Controller('responses/bfi')
export class BfiResponsesController {
  constructor(private readonly responsesService: Service) {}

  @Post()
  @UseGuards(RateLimitGuard)
  async submitAnswer(
    @Body('profileId') profileId: string,
    @Body('variable') variable: string,
    @Body('answer') answer: number[],
  ): Promise<void> {
    await this.responsesService.saveAnswer(profileId, variable, answer);
  }
}
