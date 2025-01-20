// src/questions/bfi-questions/bfi-questions.module.ts
import { Module } from '@nestjs/common';
import { BfiQuestionsController } from './bif-questions.controller';
import { BfiQuestionsService } from './bfi-questions.service';
import { BfiQuestionsRepository } from './bfi-questions.repository';
import { AbacusModule } from '../../abacus/module';
import { SupabaseModule } from 'src/supabase/module';

@Module({
  imports: [AbacusModule, SupabaseModule],
  controllers: [BfiQuestionsController],
  providers: [BfiQuestionsService, BfiQuestionsRepository],
  exports: [BfiQuestionsService]
})
export class BfiQuestionsModule {}