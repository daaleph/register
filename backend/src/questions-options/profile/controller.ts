// backend/src/questions-options/profile/controller.ts

import { Controller, Get, Param } from '@nestjs/common';
import { ProfileQuestionsService } from './service';

@Controller('questions/profile/:uuid')
export class ProfileQuestionsController {
    
    constructor(
        private readonly profileQuestionsService: ProfileQuestionsService
    ) {}

    @Get('initial')
    async getInitialProfileQuestion(): Promise<string> {
        const question = await this.profileQuestionsService.getInitialQuestion();
        const options = await this.profileQuestionsService.getInitialOptions();
        return JSON.stringify({ question, options });
    }

    @Get('questionId/:questionId')
    async getProfiledQuestion(
        @Param('uuid') uuid: string,
        @Param('questionId') questionId: number
    ): Promise<string> {
        const question = await this.profileQuestionsService.getContextualizedQuestionById(uuid, questionId);
        const options = await this.profileQuestionsService.getContextualizedOptionsById(uuid, questionId);
        return JSON.stringify({ question, options });
    }

}