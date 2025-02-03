"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsrfService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let CsrfService = class CsrfService {
    constructor() {
        this.TOKEN_LENGTH = 32;
        this.TOKEN_EXPIRY = 24 * 60 * 60 * 1000;
    }
    generateToken() {
        return {
            csrfToken: (0, crypto_1.randomBytes)(this.TOKEN_LENGTH).toString('hex'),
            expiresIn: this.TOKEN_EXPIRY,
        };
    }
    validateToken(headerToken, cookieToken) {
        return headerToken === cookieToken;
    }
};
exports.CsrfService = CsrfService;
exports.CsrfService = CsrfService = __decorate([
    (0, common_1.Injectable)()
], CsrfService);
//# sourceMappingURL=csrf.service.js.map