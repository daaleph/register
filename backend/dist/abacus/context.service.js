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
    buildContext(questions, responses, questionType) {
        const validatedType = this.validateQuestionType(questionType);
        const context = this.buildQuestionContext(questions, responses);
        return {
            type: validatedType,
            context,
            order: this.calculateTotalQuestions(questions)
        };
    }
    buildQuestionContext(questions, responses) {
        let context = {};
        let varIndexStart = 1;
        if (questions.profile && responses.profile) {
            const profileBuilder = this.contextBuilders.get('profile');
            context = {
                ...context,
                ...profileBuilder.buildQuestionContext(questions.profile, responses.profile, varIndexStart)
            };
            varIndexStart += questions.profile.length;
        }
        if (questions.bfi && responses.bfi) {
            const bfiBuilder = this.contextBuilders.get('bfi');
            context = {
                ...context,
                ...bfiBuilder.buildQuestionContext(questions.bfi, responses.bfi, varIndexStart)
            };
            varIndexStart += questions.bfi.length;
        }
        if (questions.product && responses.product) {
            const productBuilder = this.contextBuilders.get('product');
            context = {
                ...context,
                ...productBuilder.buildQuestionContext(questions.product, responses.product, varIndexStart)
            };
        }
        return context;
    }
    calculateTotalQuestions(questions) {
        return (questions.profile?.length || 0) +
            (questions.bfi?.length || 0) +
            (questions.product?.length || 0);
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
    buildQuestionContext(questions, responses, varIndexStart) {
        return questions.reduce((acc, question, index) => {
            const response = responses.find(resp => resp.variable === question.variable);
            if (!response)
                return acc;
            return {
                ...acc,
                [`var${varIndexStart + index}`]: {
                    type: question.type,
                    name_en: question.name_en,
                    name_es: question.name_es,
                    description_en: question.description_en,
                    description_es: question.description_es,
                    answer_es: response.answer_options_es,
                    answer_en: response.answer_options_en
                }
            };
        }, {});
    }
}
class BfiContextBuilder {
    buildQuestionContext(questions, responses, varIndexStart) {
        return questions.reduce((acc, question, index) => {
            const response = responses.find(resp => resp.variable === question.variable);
            if (!response)
                return acc;
            return {
                ...acc,
                [`var${varIndexStart + index}`]: {
                    description_en: question.description_en,
                    description_es: question.description_es,
                    answer_es: response.answer_options_es,
                    answer_en: response.answer_options_en
                }
            };
        }, {});
    }
}
class ProductContextBuilder {
    buildQuestionContext(questions, responses, varIndexStart) {
        return questions.reduce((acc, question, index) => {
            const response = responses.find(resp => resp.variable === question.variable);
            if (!response)
                return acc;
            return {
                ...acc,
                [`var${varIndexStart + index}`]: {
                    type: question.type,
                    name_en: question.name_en,
                    name_es: question.name_es,
                    description_en: question.description_en,
                    description_es: question.description_es,
                    answer_es: response.answer_options_es,
                    answer_en: response.answer_options_en
                }
            };
        }, {});
    }
}
class DefaultContextBuilder {
    buildQuestionContext(questions, responses, varIndexStart) {
        return questions.reduce((acc, question, index) => {
            const response = responses.find(resp => resp.variable === question.variable);
            if (!response)
                return acc;
            return {
                ...acc,
                [`var${varIndexStart + index}`]: {
                    description_en: question.description_en,
                    description_es: question.description_es,
                    answer_es: response.answer_options_es,
                    answer_en: response.answer_options_en
                }
            };
        }, {});
    }
}
//# sourceMappingURL=context.service.js.map