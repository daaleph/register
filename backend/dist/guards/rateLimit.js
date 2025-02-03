"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitGuard = void 0;
const common_1 = require("@nestjs/common");
let RateLimitGuard = class RateLimitGuard {
    constructor() {
        this.requestCounts = new Map();
        this.limit = 100;
        this.timeWindow = 60 * 1000;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
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
            throw new common_1.BadRequestException('Too many requests. Please try again later.');
        }
        this.requestCounts.set(ip, {
            count: requestInfo.count + 1,
            lastRequest: currentTime,
        });
        return true;
    }
};
exports.RateLimitGuard = RateLimitGuard;
exports.RateLimitGuard = RateLimitGuard = __decorate([
    (0, common_1.Injectable)()
], RateLimitGuard);
//# sourceMappingURL=rateLimit.js.map