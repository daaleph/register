// src/questions-options/profile/controller.ts

import { Controller, Get, Param } from '@nestjs/common';
import { ProfileQuestionsService } from './service';

@Controller('questions/profile/:uuid')
export class ProfileQuestionsController {
    constructor(
        private readonly profileQuestionsService: ProfileQuestionsService
    ) {}

    @Get('initial')
    async getInitialProfileQuestion() {
        const profileQuestion = await this.profileQuestionsService.getInitialQuestion();
        const profileOptions = await this.profileQuestionsService.getInitialOptions();
        return { profileQuestion, profileOptions };
    }

    @Get('questionId/:questionId')
    async getProfileQuestion(@Param('uuid') uuid: string, @Param('questionId') questionId: number) {
        const profileQuestion = await this.profileQuestionsService.getContextualizedQuestionById(uuid, questionId);
        const profileOptions = await this.profileQuestionsService.getContextualizedOptionsById(uuid, questionId);
        return { profileQuestion, profileOptions };
    }

}