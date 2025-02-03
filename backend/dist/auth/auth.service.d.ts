import { JwtService } from '@nestjs/jwt';
import { SupabaseService } from '../supabase/service';
import { AccessToken } from 'src/types/security';
export declare class AuthService {
    private readonly jwtService;
    private readonly supabaseService;
    constructor(jwtService: JwtService, supabaseService: SupabaseService);
    profileExists(email: string): Promise<any>;
    login(email: string, password: string): Promise<AccessToken>;
    validateToken(token: string): Promise<any>;
    finalizeRegistration(email: string, password: string): Promise<AccessToken>;
    setPassword(email: string, password: string): Promise<{
        message: string;
    }>;
    verifyPassword(profileId: string, password: string): Promise<boolean>;
}
