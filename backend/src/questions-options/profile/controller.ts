// backend/src/questions-options/profile/controller.ts
import { Controller, Get, Param, Headers, UseGuards } from '@nestjs/common';
import { ProfileQuestionsService } from './service';
import { RateLimitGuard } from 'src/guards/rateLimit';

@Controller('questions/profile')
export class ProfileQuestionsController {
    
    constructor(
        private readonly service: ProfileQuestionsService
    ) {}

    @Get('initial')
    @UseGuards(RateLimitGuard)
    async getInitialQuestionWithOptions(): Promise<string> {
        const question = await this.service.getInitialQuestion();
        const options = await this.service.getInitialOptions();
        return JSON.stringify({ question, options });
    }

    @Get('questionId/:questionId')
    @UseGuards(RateLimitGuard)
    async getQuestionWithOptions(
        @Headers('profileId') profileId: string,
        @Param('questionId') questionId: number
    ): Promise<string> {
        const question = await this.service.getContextualizedQuestionById(profileId, questionId);
        const options = await this.service.getContextualizedOptionsById(profileId, questionId);
        return JSON.stringify({ question, options });
    }

}