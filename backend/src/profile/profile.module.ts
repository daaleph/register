// profile.module.ts
import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controllers';
import { ProfileService } from './profile.service';
import { ProfileRepository } from '../repositories/profile.repository';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [ProfileController],
  providers: [ProfileService, ProfileRepository],
  exports: [ProfileService],
}) // [source](search_result_11)
export class ProfileModule {}
