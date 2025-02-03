export declare class CsrfService {
    private readonly TOKEN_LENGTH;
    private readonly TOKEN_EXPIRY;
    generateToken(): {
        csrfToken: string;
        expiresIn: number;
    };
    validateToken(headerToken: string, cookieToken: string): boolean;
}
