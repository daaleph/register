// backend/src/middleware/csrf.middleware.ts
import {
  Injectable,
  NestMiddleware,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CsrfService } from '../auth/csrf.service';

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
  private readonly logger = new Logger(CsrfMiddleware.name);

  constructor(private readonly csrfService: CsrfService) {}

  use(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'GET' || req.method === 'HEAD') return next();
    if (req.path === '/auth/csrf-token') return next();

    try {
      const csrfTokenHeader = req.headers['x-csrf-token'] as string;
      const cookieToken = req.cookies['csrf-token'];
      if (!csrfTokenHeader || !cookieToken) {
        this.logger.warn(
          `Missing CSRF token - Header: ${!!csrfTokenHeader}, Cookie: ${!!cookieToken}`,
        );
        throw new BadRequestException('Missing CSRF token');
      }
      if (!this.csrfService.validateToken(csrfTokenHeader, cookieToken)) {
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
