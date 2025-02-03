import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CsrfService } from '../auth/csrf.service';
export declare class CsrfMiddleware implements NestMiddleware {
    private readonly csrfService;
    private readonly logger;
    constructor(csrfService: CsrfService);
    use(req: Request, res: Response, next: NextFunction): void;
}
