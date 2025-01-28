// backend/src/responses/profile/controller.ts

import { Body, Controller, Post } from '@nestjs/common';
import { Service } from './service';

@Controller('responses/product')
export class ProductResponsesController {
    
    constructor(private readonly responsesService: Service) {}

    @Post()
    async submitAnswer(
        @Body('profileId') profileId: string,
        @Body('variable') variable: string,
        @Body('answer') answer: number[] | number
    ): Promise<void> {
        await this.responsesService.saveAnswerOfSpecificQuestion(profileId, variable, Array.isArray(answer) ? answer : [answer]);
    }

    @Post('other')
    async submitOtherAnswer(
        @Body('profileId') profileId: string,
        @Body('variable') variable: string,
        @Body('answer') answer: string
    ): Promise<void> {
        await this.responsesService.saveOtherAnswerOfSpecificQuestion(profileId, variable, answer);
    }

}