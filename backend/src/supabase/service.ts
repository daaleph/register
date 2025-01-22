// backend/src/supabase/service.ts
import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  
  private client: SupabaseClient;

  constructor() {
    this.client = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
    );
  }

  getConnection() {
    return this.client;
  }

  async query(table: string, params?: any): Promise<any> {
    return this.client.from(table).select().match(params);
  }

}
