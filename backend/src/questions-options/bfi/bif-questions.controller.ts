// src/questions/bfi-questions/bfi-questions.controller.ts
import { Controller, Get, Param, Body } from '@nestjs/common';
import { BfiQuestionsService } from './bfi-questions.service';

@Controller('questions/bfi')
export class BfiQuestionsController {
  constructor(private readonly service: BfiQuestionsService) {}

  @Get(':id')
  async getQuestion(@Param('id') id: number) {
    return this.service.getQuestion(id, []);
  }
}