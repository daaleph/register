"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsrfMiddleware = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let CsrfMiddleware = class CsrfMiddleware {
    use(req, res, next) {
        if (req.method === 'GET') {
            const csrfToken = (0, crypto_1.randomBytes)(32).toString('hex');
            res.cookie('csrf-token', csrfToken, { httpOnly: true, secure: true, sameSite: 'strict' });
            return next();
        }
        const csrfTokenHeader = req.headers['x-csrf-token'];
        if (!csrfTokenHeader) {
            throw new common_1.BadRequestException('Invalid CSRF token');
        }
        next();
    }
};
exports.CsrfMiddleware = CsrfMiddleware;
exports.CsrfMiddleware = CsrfMiddleware = __decorate([
    (0, common_1.Injectable)()
], CsrfMiddleware);
//# sourceMappingURL=csrf.middleware.js.map