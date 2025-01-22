// src/questions-options/profile/controller.ts

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProfileQuestionsService } from './service';
import { ProfileOptionsEntity, ProfileQuestionsEntity } from 'src/entities';

@Controller('questions/profile/:uuid')
export class ProfileQuestionsController {
    
    constructor(
        private readonly profileQuestionsService: ProfileQuestionsService
    ) {}

    @Get('initial')
    async getInitialProfileQuestion(): Promise<{question: ProfileQuestionsEntity, options: ProfileOptionsEntity[]}> {
        const question = await this.profileQuestionsService.getInitialQuestion();
        const options = await this.profileQuestionsService.getInitialOptions();
        return { question, options };
    }

    @Get('questionId/:questionId')
    async getProfiledQuestion(
        @Param('uuid') uuid: string,
        @Param('questionId') questionId: number
    ): Promise<{question: ProfileQuestionsEntity, options: ProfileOptionsEntity[]}> {
        const question = await this.profileQuestionsService.getContextualizedQuestionById(uuid, questionId);
        const options = await this.profileQuestionsService.getContextualizedOptionsById(uuid, questionId);
        return { question, options };
    }

}