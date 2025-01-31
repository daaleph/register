import { ResponsesEntity } from 'src/entities';
import { SupabaseService } from 'src/supabase/service';
export declare class Repository {
    private readonly supabaseService;
    constructor(supabaseService?: SupabaseService);
    saveResponse(response: ResponsesEntity): Promise<any>;
}
