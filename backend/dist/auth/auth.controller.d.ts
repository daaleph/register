import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(profileId: string): Promise<{
        accessToken: string;
    }>;
    finalizeRegistration(profileId: string): Promise<{
        accessToken: string;
    }>;
}
