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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const rateLimit_1 = require("../guards/rateLimit");
const csrf_service_1 = require("./csrf.service");
let AuthController = class AuthController {
    constructor(authService, csrfService) {
        this.authService = authService;
        this.csrfService = csrfService;
    }
    getCsrfToken(res) {
        const { csrfToken, expiresIn } = this.csrfService.generateToken();
        res.cookie('csrf-token', csrfToken, {
            secure: true,
            httpOnly: true,
            sameSite: 'strict',
            maxAge: expiresIn,
            path: '/',
        });
        return res.json({
            csrfToken: csrfToken,
            expiresIn,
        });
    }
    async login(email, password) {
        if (!email)
            throw new common_1.UnauthorizedException('Profile ID is required');
        if (!password)
            throw new common_1.BadRequestException('Password is required');
        return this.authService.login(email, password);
    }
    async validateToken(authHeader) {
        if (!authHeader)
            throw new common_1.UnauthorizedException('Authorization header is required');
        const token = authHeader.split(' ')[1];
        return this.authService.validateToken(token);
    }
    async finalizeRegistration(email, password) {
        if (!email)
            throw new common_1.UnauthorizedException('Profile ID is required');
        if (!password)
            throw new common_1.BadRequestException('Password is required');
        return this.authService.finalizeRegistration(email, password);
    }
    async setPassword(email, password) {
        if (!email)
            throw new common_1.UnauthorizedException('Profile ID is required');
        if (!password)
            throw new common_1.BadRequestException('Password is required');
        return this.authService.setPassword(email, password);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('csrf-token'),
    (0, common_1.UseGuards)(rateLimit_1.RateLimitGuard),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getCsrfToken", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.UseGuards)(rateLimit_1.RateLimitGuard),
    __param(0, (0, common_1.Body)('email')),
    __param(1, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('validate'),
    __param(0, (0, common_1.Headers)('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "validateToken", null);
__decorate([
    (0, common_1.Post)('finalize'),
    __param(0, (0, common_1.Body)('email')),
    __param(1, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "finalizeRegistration", null);
__decorate([
    (0, common_1.Post)('set-password'),
    __param(0, (0, common_1.Body)('email')),
    __param(1, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "setPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        csrf_service_1.CsrfService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map