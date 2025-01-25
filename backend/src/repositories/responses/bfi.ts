// backend/src/repositories/profile-responses.ts

import { Injectable } from '@nestjs/common';
import { ResponsesEntity } from 'src/entities';
import { SupabaseService } from 'src/supabase/service';

@Injectable()
export class Repository {

    constructor(
        private readonly supabaseService: SupabaseService = new SupabaseService()
    ) {}

    async saveResponse(response: ResponsesEntity): Promise<any> {
        const connection = this.supabaseService.getConnection();
        const { data, error } = response.variable === 'var01' ? 
        await connection
            .from('bfi_responses')
            .insert([
                {
                    profile: response.profile,
                    [response.variable]: response.answer_options[0]
                }
            ]) : 
        await connection
            .from('bfi_responses')
            .upsert([
                {
                    profile: response.profile,
                    [response.variable]: response.answer_options[0]
                }
            ]);
        if (error) {
            throw new Error(`Failed to insert profile response: ${error.message}`);
        }
        return data;
    }

}