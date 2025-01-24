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
        const personalizedQuestion = await this.personalizeProfileQuestion(question, context);
        return JSON.parse(personalizedQuestion.result.messages[1].text);
    }
    async personalizesProfileOptions(options, previousQuestions, previousResponses) {
        const context = this.contextService.buildContext(previousQuestions, previousResponses, 'profile');
        const personalizedOptions = await this.personalizeProfileOptions(options, context);
        return JSON.parse(personalizedOptions.result.messages[1].text).options;
    }
    async personalizesBfiQuestion(question, previousQuestions, previousResponses) {
        const context = this.contextService.buildContext(previousQuestions, previousResponses, 'bfi');
        const personalizedQuestion = await this.personalizeBfiQuestion(question, context);
        return JSON.parse(personalizedQuestion.result.messages[1].text);
    }
    async personalizesBfiOptions(options, previousQuestions, previousResponses) {
        const context = this.contextService.buildContext(previousQuestions, previousResponses, 'bfi');
        const personalizedOptions = await this.personalizeBfiOptions(options, context);
        return JSON.parse(personalizedOptions.result.messages[1].text).options;
    }
    async personalizesProductQuestion(question, previousQuestions, previousResponses) {
        const context = this.contextService.buildContext(previousQuestions, previousResponses, 'product');
        const personalizedQuestion = await this.personalizeProductQuestion(question, context);
        return JSON.parse(personalizedQuestion.result.messages[1].text);
    }
    async personalizesProductOptions(options, previousQuestions, previousResponses) {
        const context = this.contextService.buildContext(previousQuestions, previousResponses, 'product');
        const personalizedOptions = await this.personalizeProductOptions(options, context);
        return JSON.parse(personalizedOptions.result.messages[1].text).options;
    }
    async personalizeProfileQuestion(question, context) {
        const payload = createPayload([
            {
                is_user: true,
                text: `
          context:${JSON.stringify(context)},
          question:
            {"id":${question.id},
            "variable:${question.variable},
            "name_es":${question.name_es},
            "name_en":${question.name_en},
            "description_es":${question.description_es},
            "description_en":${question.description_es}"
          }`
            }
        ]);
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`https://pa002.abacus.ai/api/v0/getChatResponse?deploymentToken=${process.env.CUSTOMIZE_QUESTION_TOKEN}&deploymentId=${process.env.CUSTOMIZE_QUESTION_PROJECT}`, payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }));
            return response.data;
        }
        catch (error) {
            console.error("Error occurred while personalizing question:", {
                message: error.message,
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                config: error.config,
                payload,
                question,
                context
            });
            throw error;
        }
    }
    async personalizeBfiQuestion(question, context) {
        const payload = createPayload([
            {
                is_user: true,
                text: `
          context:${JSON.stringify(context)},
          question:
            {"id":${question.id},
            "variable:${question.variable},
            "description_es":${question.description_es},
            "description_en":${question.description_es}"
          }`
            }
        ]);
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`https://pa002.abacus.ai/api/v0/getChatResponse?deploymentToken=${process.env.CUSTOMIZE_QUESTION_TOKEN}&deploymentId=${process.env.CUSTOMIZE_QUESTION_PROJECT}`, payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }));
            return response.data;
        }
        catch (error) {
            console.error("Error occurred while personalizing question:", {
                message: error.message,
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                config: error.config,
                payload,
                question,
                context
            });
            throw error;
        }
    }
    async personalizeProductQuestion(question, context) {
        const payload = createPayload([
            {
                is_user: true,
                text: `
          context:${JSON.stringify(context)},
          question:
            {"id":${question.id},
            "variable:${question.variable},
            "name_es":${question.name_es},
            "name_en":${question.name_en},
            "description_es":${question.description_es},
            "description_en":${question.description_es}"
          }`
            }
        ]);
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`https://pa002.abacus.ai/api/v0/getChatResponse?deploymentToken=${process.env.CUSTOMIZE_QUESTION_TOKEN}&deploymentId=${process.env.CUSTOMIZE_QUESTION_PROJECT}`, payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }));
            return response.data;
        }
        catch (error) {
            console.error("Error occurred while personalizing question:", {
                message: error.message,
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                config: error.config,
                payload,
                question,
                context
            });
            throw error;
        }
    }
    async personalizeProfileOptions(options, context) {
        const payload = createPayload([
            {
                is_user: true,
                text: `
          context:${JSON.stringify(context)},
          options: ${JSON.stringify(options)}`
            }
        ]);
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`https://pa002.abacus.ai/api/v0/getChatResponse?deploymentToken=${process.env.CUSTOMIZE_OPTIONS_TOKEN}&deploymentId=${process.env.CUSTOMIZE_OPTIONS_PROJECT}`, payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }));
            return response.data;
        }
        catch (error) {
            console.error("Error occurred while personalizing question:", {
                message: error.message,
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                config: error.config,
                payload,
                options,
                context
            });
            throw error;
        }
    }
    async personalizeBfiOptions(options, context) {
        const payload = createPayload([
            {
                is_user: true,
                text: `
          context:${JSON.stringify(context)},
          options: ${JSON.stringify(options)}`
            }
        ]);
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`https://pa002.abacus.ai/api/v0/getChatResponse?deploymentToken=${process.env.CUSTOMIZE_OPTIONS_TOKEN}&deploymentId=${process.env.CUSTOMIZE_OPTIONS_PROJECT}`, payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }));
            return response.data;
        }
        catch (error) {
            console.error("Error occurred while personalizing question:", {
                message: error.message,
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                config: error.config,
                payload,
                options,
                context
            });
            throw error;
        }
    }
    async personalizeProductOptions(options, context) {
        const payload = createPayload([
            {
                is_user: true,
                text: `
          context:${JSON.stringify(context)},
          options: ${JSON.stringify(options)}`
            }
        ]);
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`https://pa002.abacus.ai/api/v0/getChatResponse?deploymentToken=${process.env.CUSTOMIZE_OPTIONS_TOKEN}&deploymentId=${process.env.CUSTOMIZE_OPTIONS_PROJECT}`, payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }));
            return response.data;
        }
        catch (error) {
            console.error("Error occurred while personalizing question:", {
                message: error.message,
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                config: error.config,
                payload,
                options,
                context
            });
            throw error;
        }
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
        chatConfig: null
    };
};
//# sourceMappingURL=personalization.service.js.map