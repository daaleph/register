import { SupabaseService } from '../supabase/supabase.service';
import { ProfileEntity } from '../entities/profile.entity';
export declare class ProfileRepository {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    findProfileById(id: string): Promise<ProfileEntity>;
    saveProfile(profile: ProfileEntity): Promise<void>;
}
