"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbacusContextService = void 0;
const common_1 = require("@nestjs/common");
let AbacusContextService = class AbacusContextService {
    buildContext(previousResponses, questionType) {
        return previousResponses.map((resp, index) => ({
            question: resp.question,
            answer: resp.answer,
            order: index + 1
        }));
    }
};
exports.AbacusContextService = AbacusContextService;
exports.AbacusContextService = AbacusContextService = __decorate([
    (0, common_1.Injectable)()
], AbacusContextService);
//# sourceMappingURL=abacus-context.service.js.map