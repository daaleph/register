// src/questions/profile-questions/profile-questions.module.ts
import { Module } from '@nestjs/common';
import { ProfileQuestionsController } from './questions.controller';
import { ProfileQuestionsService } from './questions.service';
import { ProfileQuestionsRepository } from '../../repositories/profile-questions.repository';
import { AbacusModule } from '../../abacus/abacus.module';
import { SupabaseModule } from 'src/supabase/supabase.module';

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