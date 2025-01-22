// backend/src/repositories/profile-responses.ts

import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/service';
import { ProfileResponsesEntity } from 'src/entities/profile-responses';

@Injectable()
export class ProfileResponsesRepository {

  constructor(
    private readonly supabaseService: SupabaseService = new SupabaseService()
  ) {}

  async saveProfileResponse(response: ProfileResponsesEntity): Promise<any> {
    const connection = this.supabaseService.getConnection();
    const { data, error } = await connection
      .from('profile_responses')
      .insert([
        {
          profile: response.profile,
          variable: response.variable,
          answer_options: response.answer_options
        }
      ]);

    if (error) {
      throw new Error(`Failed to insert profile response: ${error.message}`);
    }
    return data;
  }

}