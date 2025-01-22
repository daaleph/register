// backend/src/responses/profile/module.ts
import { Module } from '@nestjs/common';
import { ProfileResponsesController } from './controller';
import { ProfileResponsesService } from './service';
import { ProfileResponsesRepository } from '../../repositories/profile-responses';
import { SupabaseModule } from 'src/supabase/module';

@Module({
  imports: [
    SupabaseModule
  ],
  controllers: [ProfileResponsesController],
  providers: [
    ProfileResponsesService,
    ProfileResponsesRepository
  ],
  exports: [ProfileResponsesService]
})
export class ProfileResponsesModule {}