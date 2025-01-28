// src/questions-options/product/controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { ProductQuestionsService } from './service';
// import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('questions/product/:uuid')
// @UseGuards(JwtAuthGuard)
export class ProductQuestionsController {
    constructor(
        private readonly service: ProductQuestionsService
    ) {}

    @Get('initial')
    async getInitialQuestionWithOptions(
      @Param('uuid') uuid: string
    ): Promise<string> {
        const question = await this.service.getContextualizedInitialQuestion(uuid);
        const options = await this.service.getContextualizedInitialOptions(uuid);

        return JSON.stringify({ question, options });
    }

    @Get('questionId/:questionId')
    async getProfiledQuestionWithOptions(
        @Param('uuid') uuid: string,
        @Param('questionId') questionId: number
    ): Promise<string> {
        const question = await this.service.getContextualizedQuestionById(uuid, questionId);
        const options = await this.service.getContextualizedOptionsById(uuid, questionId);
        return JSON.stringify({ question, options });
    }
}