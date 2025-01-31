// backend/src/middleware/csrf.middleware.ts
import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { randomBytes } from 'crypto';

@Injectable()
export class CsrfMiddleware implements NestMiddleware {

    use(req: Request, res: Response, next: NextFunction) {

        const csrfTokenHeader = req.headers['x-csrf-token'];
        const csrfTokenCookie = req.cookies['csrf-token'];

        if (req.method === 'GET') {
            const csrfToken = randomBytes(32).toString('hex');
            res.cookie('csrf-token', csrfToken, { httpOnly: true, secure: true, sameSite: 'strict' });
            return next();
        }

        if (!csrfTokenHeader || csrfTokenHeader !== csrfTokenCookie) {
        throw new BadRequestException('Invalid CSRF token');
        }

        next();
    }

}