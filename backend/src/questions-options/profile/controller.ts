// profile-questions.controller.ts

import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProfileQuestionsService } from './service';

@Controller('questions/profile')
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
    async getProfileQuestion(@Param('questionId') questionId: number) {
        const profileQuestion = await this.profileQuestionsService.getContextualizedQuestionById(questionId);
        const profileOptions = await this.profileQuestionsService.getContextualizedOptionsById(questionId);
        return { profileQuestion, profileOptions };
    }

    // @Post(':questionId/answer')
    // async submitProfileAnswer(
    //     @Param('questionId') questionId: number,
    //     @Body() data: {
    //     profileId: string;
    //     variable: string;
    //     answer: number[] | number;
    //     }
    // ) {
    //     return await this.profileQuestionsService.handleProfileAnswer(
    //         questionId,
    //         data.profileId,
    //         data.variable,
    //         data.answer
    //     );
    // }
}