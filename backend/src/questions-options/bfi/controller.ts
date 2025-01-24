// src/questions/bfi-questions/bfi-questions.controller.ts
import { Controller, Get, Param, Body } from '@nestjs/common';
import { BfiQuestionsService } from './service';

@Controller('questions/bfi/:uuid')
export class BfiQuestionsController {
  constructor(private readonly service: BfiQuestionsService) {}

  @Get(':id')
  async getQuestion(@Param('id') id: number) {
    return this.service.getQuestion(id, []);
  }
}

// @Controller('questions/profile/:uuid')
// export class ProfileQuestionsController {
    
//     constructor(
//         private readonly profileQuestionsService: ProfileQuestionsService
//     ) {}

//     @Get('initial')
//     async getInitialProfileQuestion(): Promise<string> {
//         const question = await this.profileQuestionsService.getInitialQuestion();
//         const options = await this.profileQuestionsService.getInitialOptions();
//         return JSON.stringify({ question, options });
//     }

//     @Get('questionId/:questionId')
//     async getProfiledQuestion(
//         @Param('uuid') uuid: string,
//         @Param('questionId') questionId: number
//     ): Promise<string> {
//         const question = await this.profileQuestionsService.getContextualizedQuestionById(uuid, questionId);
//         const options = await this.profileQuestionsService.getContextualizedOptionsById(uuid, questionId);
//         return JSON.stringify({ question, options });
//     }

// }