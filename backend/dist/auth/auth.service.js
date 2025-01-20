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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const service_1 = require("../supabase/service");
let AuthService = class AuthService {
    constructor(jwtService, supabaseService) {
        this.jwtService = jwtService;
        this.supabaseService = supabaseService;
    }
    async login(profileId) {
        const profile = await this.supabaseService
            .getConnection()
            .from('profile')
            .select('*')
            .eq('id', profileId)
            .single();
        if (!profile) {
            throw new common_1.UnauthorizedException('Profile not found');
        }
        const payload = {
            sub: profileId,
            email: profile.email,
        };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
    async validateToken(token) {
        try {
            return await this.jwtService.verify(token);
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        service_1.SupabaseService])
], AuthService);
//# sourceMappingURL=auth.service.js.map