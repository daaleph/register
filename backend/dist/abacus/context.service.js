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
exports.AbacusContextService = void 0;
const common_1 = require("@nestjs/common");
let AbacusContextService = class AbacusContextService {
    constructor() {
        this.contextBuilders = new Map([
            ['profile', new ProfileContextBuilder()],
            ['bfi', new BfiContextBuilder()],
            ['product', new ProductContextBuilder()]
        ]);
    }
    buildQuestionContext(questions, responses, questionType) {
        const contextBuilder = this.contextBuilders.get(questionType) || new DefaultContextBuilder();
        return questions.reduce((acc, question, index) => {
            const response = responses.find(resp => resp.variable === question.variable);
            const context = contextBuilder.buildQuestionContext(question, index + 1, response);
            return { ...acc, ...context };
        }, {});
    }
    buildContext(previousQuestions, previousResponses, questionType) {
        const validatedType = this.validateQuestionType(questionType);
        const context = this.buildQuestionContext(previousQuestions, previousResponses, validatedType);
        return {
            type: validatedType,
            context,
            order: previousQuestions.length + 1
        };
    }
    validateQuestionType(type) {
        return ['profile', 'bfi', 'product'].includes(type) ? type : 'unknown';
    }
};
exports.AbacusContextService = AbacusContextService;
exports.AbacusContextService = AbacusContextService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AbacusContextService);
class ProfileContextBuilder {
    buildQuestionContext(question, varIndex, response) {
        if (!response)
            return {};
        return {
            [`var${varIndex}`]: {
                type: question.type,
                name_en: question.name_en,
                name_es: question.name_es,
                description_en: question.description_en,
                description_es: question.description_es,
                answer_es: response.answer_options_es,
                answer_en: response.answer_options_en
            }
        };
    }
}
class BfiContextBuilder {
    buildQuestionContext(question, varIndex, response) {
        if (!response)
            return {};
        return {
            [`var${varIndex}`]: {
                description_en: question.description_en,
                description_es: question.description_es,
                answer_es: response.answer_options_es,
                answer_en: response.answer_options_en
            }
        };
    }
}
class ProductContextBuilder {
    buildQuestionContext(question, varIndex, response) {
        if (!response)
            return {};
        return {
            [`var${varIndex}`]: {
                type: question.type,
                name_en: question.name_en,
                name_es: question.name_es,
                description_en: question.description_en,
                description_es: question.description_es,
                answer_es: response.answer_options_es,
                answer_en: response.answer_options_en
            }
        };
    }
}
class DefaultContextBuilder {
    buildQuestionContext(question, varIndex, response) {
        if (!response)
            return {};
        return {
            [`var${varIndex}`]: {
                description_en: question.description_en,
                description_es: question.description_es,
                answer_es: response.answer_options_es,
                answer_en: response.answer_options_en
            }
        };
    }
}
//# sourceMappingURL=context.service.js.map