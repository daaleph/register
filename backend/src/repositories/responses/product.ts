// backend/src/repositories/responses/product.ts

import { Injectable } from '@nestjs/common';
import { ResponsesEntity } from 'src/entities';
import { SupabaseService } from 'src/supabase/service';

@Injectable()
export class Repository {
  constructor(
    private readonly supabaseService: SupabaseService = new SupabaseService(),
  ) {}

  async saveResponse(response: ResponsesEntity): Promise<any> {
    const connection = this.supabaseService.getConnection();
    const { data, error } = await connection.from('product_responses').insert([
      {
        profile: response.profile,
        variable: response.variable,
        answer_options: response.answer_options,
      },
    ]);

    if (error) {
      throw new Error(`Failed to insert profile response: ${error.message}`);
    }
    return data;
  }

  async saveOtherResponse(
    profile: string,
    variable: string,
    answer: string,
  ): Promise<any> {
    const connection = this.supabaseService.getConnection();
    const { data, error } = await connection.from('others').insert([
      {
        profile,
        variable,
        answer,
        nature: 3,
      },
    ]);

    if (error) {
      throw new Error(`Failed to insert profile response: ${error.message}`);
    }
    return data;
  }
}
