// backend/src/middleware/csrf.middleware.ts
import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { randomBytes } from 'crypto';

@Injectable()
export class CsrfMiddleware implements NestMiddleware {

    use(req: Request, res: Response, next: NextFunction) {

        if (req.method === 'GET') {
            const csrfToken = randomBytes(32).toString('hex');
            res.cookie('csrf-token', csrfToken, { httpOnly: true, secure: true, sameSite: 'strict' });
            return next();
        }

        const csrfTokenHeader = req.headers['x-csrf-token'];

        if (!csrfTokenHeader) {
            throw new BadRequestException('Invalid CSRF token');
        }

        next();

    }

}