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
    buildContext(previousQuestions, previousResponses, questionType) {
        const context = previousQuestions.reduce((acc, question) => {
            const response = previousResponses.find(resp => resp.variable === question.variable);
            response ? acc[question.variable] = {
                type: question.type,
                name_en: question.name_en,
                name_es: question.name_es,
                description_en: question.description_en,
                description_es: question.description_es,
                answer_es: response.answer_options_es,
                answer_en: response.answer_options_en
            } : null;
            return acc;
        }, {});
        switch (questionType) {
            case 'profile':
                return {
                    type: 'profile',
                    context: context,
                    order: previousQuestions.length + 1
                };
            case 'bfi':
                return {
                    type: 'bfi',
                    context: context,
                    order: previousQuestions.length + 1
                };
            case 'product':
                return {
                    type: 'product',
                    context: context,
                    order: previousQuestions.length + 1
                };
            default:
                return {
                    type: 'unknown',
                    context: context,
                    order: previousQuestions.length + 1
                };
        }
    }
};
exports.AbacusContextService = AbacusContextService;
exports.AbacusContextService = AbacusContextService = __decorate([
    (0, common_1.Injectable)()
], AbacusContextService);
//# sourceMappingURL=context.service.js.map