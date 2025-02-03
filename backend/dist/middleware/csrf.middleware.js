"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CsrfMiddleware_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsrfMiddleware = void 0;
const common_1 = require("@nestjs/common");
const csrf_service_1 = require("../auth/csrf.service");
let CsrfMiddleware = CsrfMiddleware_1 = class CsrfMiddleware {
    constructor(csrfService) {
        this.csrfService = csrfService;
        this.logger = new common_1.Logger(CsrfMiddleware_1.name);
    }
    use(req, res, next) {
        if (req.method === 'GET' || req.method === 'HEAD')
            return next();
        if (req.path === '/auth/csrf-token')
            return next();
        try {
            console.log("HEADERS:", req.headers);
            console.log("COOKIES:", req.cookies);
            const xCsrfToken = req.headers['x-csrf-token'];
            const csrfToken = req.cookies['csrf-token'];
            if (!xCsrfToken || !csrfToken) {
                this.logger.warn(`Missing CSRF token - Header: ${!!xCsrfToken}, Cookie: ${!!csrfToken}`);
                throw new common_1.BadRequestException('Missing CSRF token');
            }
            if (!this.csrfService.validateToken(xCsrfToken, csrfToken)) {
                this.logger.warn('CSRF token mismatch');
                throw new common_1.BadRequestException('Invalid CSRF token');
            }
            next();
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException)
                throw error;
            this.logger.error('CSRF validation error', error);
            throw new common_1.BadRequestException('CSRF validation failed');
        }
    }
};
exports.CsrfMiddleware = CsrfMiddleware;
exports.CsrfMiddleware = CsrfMiddleware = CsrfMiddleware_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [csrf_service_1.CsrfService])
], CsrfMiddleware);
//# sourceMappingURL=csrf.middleware.js.map