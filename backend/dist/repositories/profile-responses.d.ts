import { SupabaseService } from 'src/supabase/service';
import { ProfileResponsesEntity } from 'src/entities/profile-responses';
export declare class ProfileResponsesRepository {
    private readonly supabaseService;
    constructor(supabaseService?: SupabaseService);
    saveProfileResponse(response: ProfileResponsesEntity): Promise<any>;
}
