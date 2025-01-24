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
exports.BfiQuestionsService = void 0;
const common_1 = require("@nestjs/common");
const bfi_1 = require("../../repositories/questions/bfi");
const personalization_service_1 = require("../../abacus/personalization.service");
let BfiQuestionsService = class BfiQuestionsService {
    constructor(repository, abacusPersonalizationService) {
        this.repository = repository;
        this.abacusPersonalizationService = abacusPersonalizationService;
    }
    async getInitialQuestion() {
        return this.repository.findQuestion(1);
    }
    async getInitialOptions() {
        return this.repository.findOptions(1);
    }
    async getQuestionById(id) {
        return this.repository.findQuestion(id);
    }
    async getOptionsById(id) {
        return this.repository.findOptions(id);
    }
    async getContextualizedQuestionById(uuid, id) {
        const question = await this.getQuestionById(id);
        const previousQuestions = await this.repository.getPreviousQuestions(id);
        const previousResponses = await this.repository.getPreviousResponses(uuid, id);
        const personalizedQuestion = await this.abacusPersonalizationService.personalizesBfiQuestion(question, previousQuestions, previousResponses);
        question.description_en = personalizedQuestion.description_en;
        question.description_es = personalizedQuestion.description_es;
        return question;
    }
    async getContextualizedOptionsById(uuid, id) {
        const options = await this.getOptionsById(id);
        const previousQuestions = await this.repository.getPreviousQuestions(id);
        const previousResponses = await this.repository.getPreviousResponses(uuid, id);
        return await this.abacusPersonalizationService.personalizesBfiOptions(options, previousQuestions, previousResponses, id);
    }
};
exports.BfiQuestionsService = BfiQuestionsService;
exports.BfiQuestionsService = BfiQuestionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [bfi_1.BfiQuestionsRepository,
        personalization_service_1.AbacusPersonalizationService])
], BfiQuestionsService);
//# sourceMappingURL=service.js.map