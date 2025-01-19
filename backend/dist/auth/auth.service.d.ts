import { JwtService } from '@nestjs/jwt';
import { SupabaseService } from '../supabase/supabase.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly supabaseService;
    constructor(jwtService: JwtService, supabaseService: SupabaseService);
    login(profileId: string): Promise<{
        accessToken: string;
    }>;
    validateToken(token: string): Promise<any>;
}
