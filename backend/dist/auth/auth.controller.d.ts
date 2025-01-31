import { AuthService } from './auth.service';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getCsrfToken(res: Response): Response<any, Record<string, any>>;
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
