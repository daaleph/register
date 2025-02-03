import { AuthService } from './auth.service';
import { Response } from 'express';
import { CsrfService } from './csrf.service';
export declare class AuthController {
    private readonly authService;
    private readonly csrfService;
    constructor(authService: AuthService, csrfService: CsrfService);
    getCsrfToken(res: Response): Response<any, Record<string, any>>;
    login(email: string, password: string): Promise<import("../types/security").AccessToken>;
    validateToken(authHeader: string): Promise<any>;
    finalizeRegistration(email: string, password: string): Promise<import("../types/security").AccessToken>;
    setPassword(email: string, password: string): Promise<{
        message: string;
    }>;
}
