// backend/src/middleware/csrf.middleware.ts
import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.method !== 'GET') {
      const csrfTokenHeader = req.headers['x-csrf-token'];
      const cookieToken = req.cookies['csrf-token'];
      if (!csrfTokenHeader || !cookieToken || csrfTokenHeader !== cookieToken) {
        throw new BadRequestException('Invalid CSRF token');
      }
    }
    next();
  }
}
