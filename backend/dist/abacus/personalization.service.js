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
const context_service_1 = require("./context.service");
const rxjs_1 = require("rxjs");
let AbacusPersonalizationService = class AbacusPersonalizationService {
    constructor(httpService, contextService) {
        this.httpService = httpService;
        this.contextService = contextService;
    }
    async personalizesProfileQuestion(question, previousQuestions, previousResponses) {
        const context = this.contextService.buildContext(previousQuestions, previousResponses, 'profile');
        console.log("CONTEXT FOR QUESTION:", context);
        return this.personalizeQuestion(question, context, 'profile');
    }
    async personalizesProfileOptions(options, previousQuestions, previousResponses) {
        const context = this.contextService.buildContext(previousQuestions, previousResponses, 'profile');
        console.log("CONTEXT FOR OPTIONS:", context);
        return this.personalizeOptions(options, context, 'profile');
    }
    async personalizesBFIQuestion(question, previousQuestions, previousResponses) {
        const context = this.contextService.buildContext(previousQuestions, previousResponses, 'bfi');
        return this.personalizeQuestion(question, context, 'bfi');
    }
    async personalizesProductQuestion(question, previousQuestions, previousResponses) {
        const context = this.contextService.buildContext(previousQuestions, previousResponses, 'product');
        return this.personalizeQuestion(question, context, 'product');
    }
    async personalizeQuestion(question, context, type) {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post('https://api.abacus.ai/personalize/question', {
            question,
            type,
            context
        }));
        return response.data;
    }
    async personalizeOptions(options, context, type) {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post('https://api.abacus.ai/personalize/question', {
            options,
            type,
            context
        }));
        return response.data;
    }
};
exports.AbacusPersonalizationService = AbacusPersonalizationService;
exports.AbacusPersonalizationService = AbacusPersonalizationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        context_service_1.AbacusContextService])
], AbacusPersonalizationService);
//# sourceMappingURL=personalization.service.js.map