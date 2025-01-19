// src/questions/profile-questions/profile-questions.module.ts
import { Module } from '@nestjs/common';
import { ProfileQuestionsController } from './profile-questions.controller';
import { ProfileQuestionsService } from './profile-questions.service';
import { ProfileQuestionsRepository } from '../../repositories/profile-questions.repository';
import { AbacusModule } from '../../abacus/abacus.module';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [
    SupabaseModule,  // Add this import
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