// backend/src/responses/bfi/controller.ts

import { Body, Controller, Post } from '@nestjs/common';
import { Service } from './service';

@Controller('responses/profile')
export class BfiResponsesController {
    
    constructor(
        private readonly responsesService: Service
    ) {}

    @Post()
    async submitAnswer(
        @Body('profileId') profileId: string,
        @Body('variable') variable: string,
        @Body('answer') answer: number[]
    ): Promise<void> {
        await this.responsesService.saveAnswer(profileId, variable, answer);
    }

}