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
const rxjs_1 = require("rxjs");
const inspector_1 = require("inspector");
const context_service_1 = require("./context.service");
let AbacusPersonalizationService = class AbacusPersonalizationService {
    constructor(httpService, contextService) {
        this.httpService = httpService;
        this.contextService = contextService;
    }
    async personalizesProfileQuestion(question, previousQuestions, previousResponses) {
        const context = this.contextService.buildContext({ profile: previousQuestions }, { profile: previousResponses }, 'profile');
        return this.personalizeQuestion(question, context);
    }
    async personalizesProfileOptions(options, previousQuestions, previousResponses) {
        const context = this.contextService.buildContext({ profile: previousQuestions }, { profile: previousResponses }, 'profile');
        return this.personalizeOptions(options, context);
    }
    async personalizesBfiQuestion(question, questions, responses) {
        const context = this.contextService.buildContext(questions, responses, 'bfi');
        return this.personalizeQuestion(question, context);
    }
    async personalizesBfiOptions(options, questions, responses) {
        const context = this.contextService.buildContext(questions, responses, 'bfi');
        return this.personalizeOptions(options, context);
    }
    async personalizesProductQuestion(question, questions, responses) {
        const context = this.contextService.buildContext(questions, responses, 'product');
        return this.personalizeQuestion(question, context);
    }
    async personalizesProductOptions(options, questions, responses) {
        const context = this.contextService.buildContext(questions, responses, 'product');
        return this.personalizeOptions(options, context);
    }
    async personalizeQuestion(question, context) {
        const payload = this.createQuestionPayload(question, context);
        const response = await this.makeAbacusRequest(process.env.CUSTOMIZE_QUESTION_TOKEN, process.env.CUSTOMIZE_QUESTION_PROJECT, payload);
        return JSON.parse(response.result.messages[1].text);
    }
    async personalizeOptions(options, context) {
        const payload = this.createOptionsPayload(options, context);
        const response = await this.makeAbacusRequest(process.env.CUSTOMIZE_OPTIONS_TOKEN, process.env.CUSTOMIZE_OPTIONS_PROJECT, payload);
        return JSON.parse(response.result.messages[1].text).options;
    }
    createQuestionPayload(question, context) {
        return createPayload([
            {
                is_user: true,
                text: `context:${JSON.stringify(context)},question:${JSON.stringify(question)}`,
            },
        ]);
    }
    createOptionsPayload(options, context) {
        return createPayload([
            {
                is_user: true,
                text: `context:${JSON.stringify(context)},options:${JSON.stringify(options)}`,
            },
        ]);
    }
    async makeAbacusRequest(token, projectId, payload) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`https://pa002.abacus.ai/api/v0/getChatResponse?deploymentToken=${token}&deploymentId=${projectId}`, payload, { headers: { 'Content-Type': 'application/json' } }));
            return response.data;
        }
        catch (error) {
            this.handleError(error, payload);
        }
    }
    handleError(error, payload) {
        inspector_1.console.error('Error occurred while making Abacus request:', {
            message: error.message,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            config: error.config,
            payload,
        });
        throw error;
    }
};
exports.AbacusPersonalizationService = AbacusPersonalizationService;
exports.AbacusPersonalizationService = AbacusPersonalizationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        context_service_1.AbacusContextService])
], AbacusPersonalizationService);
const createPayload = (messages) => {
    return {
        messages,
        llmName: null,
        numCompletionTokens: null,
        systemMessage: null,
        temperature: 0.0,
        filterKeyValues: null,
        searchScoreCutoff: null,
        chatConfig: null,
    };
};
//# sourceMappingURL=personalization.service.js.map