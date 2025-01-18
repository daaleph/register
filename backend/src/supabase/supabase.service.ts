// src/supabase/supabase.service.ts

import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
    private supabase: SupabaseClient;

    constructor() {
        this.supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_KEY
        );
    }

    getConnection(): SupabaseClient {
        return this.supabase;
    }

    async query(query: string, params?: any): Promise<any> {
        return await this.supabase.rpc(query, params);
    }
} // [source](search_result_11)