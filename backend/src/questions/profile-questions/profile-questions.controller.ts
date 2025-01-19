// profile-questions.controller.ts

import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProfileQuestionsService } from './profile-questions.service';

@Controller('questions/profile')
export class ProfileQuestionsController {
    constructor(
        private readonly profileQuestionsService: ProfileQuestionsService
    ) {}

    @Get('initial')
    async getInitialProfileQuestion() {
        const profileQuestionsService = await this.profileQuestionsService.getQuestionById(1);
        return profileQuestionsService;
    }

    @Get(':questionId')
    async getProfileQuestion(@Param('questionId') questionId: number) {
        return await this.profileQuestionsService.getQuestionById(questionId);
    }

    @Post(':questionId/answer')
    async submitProfileAnswer(
        @Param('questionId') questionId: number,
        @Body() data: {
        profileId: string;
        variable: string;
        answer: number[] | number;
        }
    ) {
        return await this.profileQuestionsService.handleProfileAnswer(
            questionId,
            data.profileId,
            data.variable,
            data.answer
        );
    }
}