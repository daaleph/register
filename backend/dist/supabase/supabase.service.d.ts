import { SupabaseClient } from '@supabase/supabase-js';
export declare class SupabaseService {
    private client;
    constructor();
    getConnection(): SupabaseClient<any, "public", any>;
    query(table: string, params?: any): Promise<any>;
}
