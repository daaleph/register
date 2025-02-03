// backend/src/repositories/profile.ts
import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/service';
import { ProfileEntity } from '../entities/profile';

@Injectable()
export class ProfileRepository {
  constructor(private readonly supabaseService: SupabaseService) {}

  async createProfile(profile: ProfileEntity): Promise<string> {
    const { data, error } = await this.supabaseService
      .getConnection()
      .from('profile')
      .insert([
        {
          ...profile,
          id: crypto.randomUUID(),
        },
      ])
      .select('id')
      .single();
    if (error) throw error;
    return data.id;
  }

  async findProfileById(id: string): Promise<ProfileEntity> {
    const { data, error } = await this.supabaseService
      .getConnection()
      .from('profile')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async saveProfile(profile: ProfileEntity): Promise<void> {
    await this.supabaseService.query('profile', profile);
  }
}
