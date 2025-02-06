// backend/src/middleware/csrf.middleware.ts
import {
  Injectable,
  NestMiddleware,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CsrfService } from '../auth/csrf.service';

// This must be refactored

@Injectable()
export class CsrfMiddleware implements NestMiddleware {

  private readonly logger = new Logger(CsrfMiddleware.name);
  constructor(private readonly csrfService: CsrfService) {}

  use(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'GET' || req.method === 'HEAD') return next();
    if (req.path === '/auth/csrf-token') return next();
    try {

      const cookieHeaders = req.headers.cookie;
      const csrfTokens: string[] = cookieHeaders
        .split('; ')
        .map(token => token.replace('csrf-token=', ''));
      const xCsrfToken = req.headers['x-csrf-token'] as string;
      const csrfToken = req.cookies['csrf-token'];

      if (!xCsrfToken || !csrfToken || !csrfTokens) {
        this.logger.warn(
          `Missing CSRF token - Header: ${!!xCsrfToken}, Cookie: ${!!csrfToken}`,
        );
        throw new BadRequestException('Missing CSRF token');
      }
      if (
        !(
          this.csrfService.validateToken(xCsrfToken, csrfToken) || 
          this.csrfService.validateToken(xCsrfToken, csrfTokens[0]) ||
          this.csrfService.validateToken(xCsrfToken, csrfTokens[1]) ||
          this.csrfService.validateToken(csrfToken, csrfTokens[0]) ||
          this.csrfService.validateToken(csrfToken, csrfTokens[1])
        )
      ) {
        this.logger.warn('CSRF token mismatch');
        throw new BadRequestException('Invalid CSRF token');
      }
      next();
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      this.logger.error('CSRF validation error', error);
      throw new BadRequestException('CSRF validation failed');
    }
  }
}
