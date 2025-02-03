// backend/src/auth/csrf.service.ts
import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Injectable()
export class CsrfService {
  private readonly TOKEN_LENGTH = 32;
  private readonly TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  generateToken() {
    return {
      csrfToken: randomBytes(this.TOKEN_LENGTH).toString('hex'),
      expiresIn: this.TOKEN_EXPIRY,
    };
  }

  validateToken(headerToken: string, cookieToken: string): boolean {
    return headerToken === cookieToken;
  }
  
}
