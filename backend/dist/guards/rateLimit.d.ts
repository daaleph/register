import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class RateLimitGuard implements CanActivate {
    private readonly requestCounts;
    private readonly limit;
    private readonly timeWindow;
    canActivate(context: ExecutionContext): boolean;
}
