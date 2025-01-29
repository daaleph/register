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
const crypto_1 = require("crypto");
let AuthService = class AuthService {
    constructor(jwtService, supabaseService) {
        this.jwtService = jwtService;
        this.supabaseService = supabaseService;
    }
    async profileExists(email) {
        const profile = await this.supabaseService
            .getConnection()
            .from('profile')
            .select('*')
            .eq('email', email)
            .single();
        if (!profile.data) {
            throw new common_1.UnauthorizedException('Profile not found');
        }
        return profile.data;
    }
    async login(email, password) {
        const profile = await this.profileExists(email);
        const passwordHash = profile.password;
        if (!passwordHash) {
            throw new common_1.UnauthorizedException('Password not set for this profile');
        }
        const [salt, storedHash] = passwordHash.split(':');
        const hashedPassword = (0, crypto_1.pbkdf2Sync)(password, salt, 1000, 64, 'sha512').toString('hex');
        if (hashedPassword !== storedHash) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = {
            sub: profile.id,
            email: profile.email,
        };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
    async validateToken(token) {
        try {
            return this.jwtService.verify(token);
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
    async finalizeRegistration(email, password) {
        await this.setPassword(email, password);
        return this.login(email, password);
    }
    async setPassword(email, password) {
        await this.profileExists(email);
        if (password.length < 8) {
            throw new common_1.BadRequestException('Password must be at least 8 characters long');
        }
        const salt = (0, crypto_1.randomBytes)(16).toString('hex');
        const hashedPassword = (0, crypto_1.pbkdf2Sync)(password, salt, 1000, 64, 'sha512').toString('hex');
        const passwordHash = `${salt}:${hashedPassword}`;
        const { error } = await this.supabaseService
            .getConnection()
            .from('profile')
            .update({ password: passwordHash })
            .eq('email', email);
        if (error) {
            throw new common_1.BadRequestException('Failed to set password');
        }
        return { message: 'Password set successfully' };
    }
    async verifyPassword(profileId, password) {
        const profile = await this.profileExists(profileId);
        const passwordHash = profile.password;
        if (!passwordHash) {
            throw new common_1.UnauthorizedException('Password not set for this profile');
        }
        const [salt, storedHash] = passwordHash.split(':');
        const hashedPassword = (0, crypto_1.pbkdf2Sync)(password, salt, 1000, 64, 'sha512').toString('hex');
        return hashedPassword === storedHash;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        service_1.SupabaseService])
], AuthService);
//# sourceMappingURL=auth.service.js.map