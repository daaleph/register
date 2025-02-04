import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class RateLimitGuard implements CanActivate {

  private readonly requestCounts = new Map<string, { count: number; lastRequest: number }>();
  private readonly limit = 100000;
  private readonly timeWindow = 60 * 1000;

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const ip = request.ip;
    const currentTime = Date.now();
    const requestInfo = this.requestCounts.get(ip);
    if (!requestInfo) {
      this.requestCounts.set(ip, { count: 1, lastRequest: currentTime });
      return true;
    }
    const timeSinceLastRequest = currentTime - requestInfo.lastRequest;
    if (timeSinceLastRequest > this.timeWindow) {
      this.requestCounts.set(ip, { count: 1, lastRequest: currentTime });
      return true;
    }
    if (requestInfo.count >= this.limit) {
      throw new BadRequestException(
        'Too many requests. Please try again later.',
      );
    }
    this.requestCounts.set(ip, {
      count: requestInfo.count + 1,
      lastRequest: currentTime,
    });
    return true;
  }
  
}
