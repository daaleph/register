// src/questions-options/product/controller.ts
import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { ProductQuestionsService } from './service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('questions/product')
@UseGuards(JwtAuthGuard)
export class ProductQuestionsController {
    constructor(private readonly service: ProductQuestionsService) {}

    @Get(':id')
    async getQuestion(@Param('id') id: number) {
        return this.service.getQuestion(id, []);
    }

    @Post(':variable')
    async saveAnswer(
        @Param('variable') variable: string,
        @Body('profileId') profileId: string,
        @Body('answer') answer: number[]
    ) {
        await this.service.storeAnswer(profileId, variable, answer);
    } 
}