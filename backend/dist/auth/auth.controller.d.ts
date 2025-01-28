import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(email: string, password: string): Promise<{
        accessToken: string;
    }>;
    validateToken(authHeader: string): Promise<any>;
    finalizeRegistration(email: string, password: string): Promise<{
        accessToken: string;
    }>;
    setPassword(email: string, password: string): Promise<{
        message: string;
    }>;
}
