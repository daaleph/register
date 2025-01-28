// backend/src/responses/profile/module.ts

import { Module } from '@nestjs/common';
import { ProfileResponsesController } from './controller';
import { Service } from './service';
import { Repository } from '../../repositories/responses/profile';
import { SupabaseModule } from 'src/supabase/module';

@Module({
  imports: [SupabaseModule],
  controllers: [ProfileResponsesController],
  providers: [
    Service,
    Repository
  ],
  exports: [Service]
})
export class ProfileResponsesModule {}