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
exports.AbacusPersonalizationService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const abacus_context_service_1 = require("./abacus-context.service");
let AbacusPersonalizationService = class AbacusPersonalizationService {
    constructor(httpService, contextService) {
        this.httpService = httpService;
        this.contextService = contextService;
    }
    async personalizesProfileQuestion(questionId, previousResponses) {
        const context = this.contextService.buildContext(previousResponses, 'profile');
        return this.personalizeQuestion(questionId, context, 'profile');
    }
    async personalizesBFIQuestion(questionId, previousResponses) {
        const context = this.contextService.buildContext(previousResponses, 'bfi');
        return this.personalizeQuestion(questionId, context, 'bfi');
    }
    async personalizesProductQuestion(questionId, previousResponses) {
        const context = this.contextService.buildContext(previousResponses, 'product');
        return this.personalizeQuestion(questionId, context, 'product');
    }
    async personalizeQuestion(questionId, context, type) {
        const response = await this.httpService.post('https://api.abacus.ai/personalize/question', {
            questionId,
            type,
            context
        }).toPromise();
        return response.data;
    }
};
exports.AbacusPersonalizationService = AbacusPersonalizationService;
exports.AbacusPersonalizationService = AbacusPersonalizationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        abacus_context_service_1.AbacusContextService])
], AbacusPersonalizationService);
//# sourceMappingURL=abacus-personalization.service.js.map