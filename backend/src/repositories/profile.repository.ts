// src/repositories/profile.repository.ts
import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { ProfileEntity } from '../entities/profile.entity';

@Injectable()
export class ProfileRepository {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findProfileById(id: string): Promise<ProfileEntity> {
    const { data } = await this.supabaseService.query('profile', { id });
    return data;
  }

  async saveProfile(profile: ProfileEntity): Promise<void> {
    await this.supabaseService.query('profile', profile);
  }
} // [source](search_result_11)
