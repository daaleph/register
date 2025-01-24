import { SupabaseService } from 'src/supabase/service';
import { ProfileResponsesEntity } from 'src/entities/profile-responses';
export declare class Repository {
    private readonly supabaseService;
    constructor(supabaseService?: SupabaseService);
    saveResponse(response: ProfileResponsesEntity): Promise<any>;
    saveOtherResponse(profile: string, variable: string, answer: string, nature: number): Promise<any>;
}
