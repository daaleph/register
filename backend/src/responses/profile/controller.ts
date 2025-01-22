// backend/src/responses/profile/controller.ts

import { Body, Controller, Post } from '@nestjs/common';
import { ProfileResponsesService } from './service';

@Controller('responses/profile')
export class ProfileResponsesController {
    
    constructor(
        private readonly profileResponsesService: ProfileResponsesService
    ) {}

    @Post()
    async submitProfileAnswer(
        @Body('profileId') profileId: string,
        @Body('variable') variable: string,
        @Body('answer') answer: number[] | number
    ): Promise<void> {
        await this.profileResponsesService.saveAnswerOfSpecificQuestion(profileId, variable, Array.isArray(answer) ? answer : [answer]);
    }

}