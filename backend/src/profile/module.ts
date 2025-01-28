// profile.module.ts
import { Module } from '@nestjs/common';
import { ProfileController } from './controllers';
import { ProfileService } from './service';
import { ProfileRepository } from '../repositories/profile';
import { SupabaseModule } from '../supabase/module';

@Module({
  imports: [SupabaseModule],
  controllers: [ProfileController],
  providers: [ProfileService, ProfileRepository],
  exports: [ProfileService],
})

export class ProfileModule {}
