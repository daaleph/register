// src/questions/profile-questions/profile-questions.module.ts
import { Module } from '@nestjs/common';
import { ProfileQuestionsController } from './controller';
import { ProfileQuestionsService } from './service';
import { ProfileQuestionsRepository } from '../../repositories/questions/profile';
import { AbacusModule } from '../../abacus/module';
import { SupabaseModule } from 'src/supabase/module';

@Module({
  imports: [
    SupabaseModule,
    AbacusModule
  ],
  controllers: [ProfileQuestionsController],
  providers: [
    ProfileQuestionsService,
    ProfileQuestionsRepository
  ],
  exports: [ProfileQuestionsService]
})
export class ProfileQuestionsModule {}