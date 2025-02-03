// src/questions-options/bfi/module.ts
import { Module } from '@nestjs/common';
import { BfiQuestionsController } from './controller';
import { BfiQuestionsService } from './service';
import { BfiQuestionsRepository } from '../../repositories/questions/bfi';
import { AbacusModule } from '../../abacus/module';
import { SupabaseModule } from 'src/supabase/module';
import { ProfileQuestionsRepository } from 'src/repositories/questions';

@Module({
  imports: [AbacusModule, SupabaseModule],
  controllers: [BfiQuestionsController],
  providers: [
    BfiQuestionsService,
    BfiQuestionsRepository,
    ProfileQuestionsRepository,
  ],
  exports: [BfiQuestionsService],
})
export class BfiQuestionsModule {}
