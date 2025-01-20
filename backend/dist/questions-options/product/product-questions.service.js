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
exports.ProductQuestionsService = void 0;
const common_1 = require("@nestjs/common");
const product_questions_repository_1 = require("./product-questions.repository");
const personalization_service_1 = require("../../abacus/personalization.service");
let ProductQuestionsService = class ProductQuestionsService {
    constructor(repository, abacusService) {
        this.repository = repository;
        this.abacusService = abacusService;
    }
    async getQuestion(questionId, previousResponses) {
    }
    async storeAnswer(profileId, variable, answer) {
        await this.repository.saveResponse({
            profile: profileId,
            variable,
            answer_options: answer,
            date_answer: new Date()
        });
    }
};
exports.ProductQuestionsService = ProductQuestionsService;
exports.ProductQuestionsService = ProductQuestionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_questions_repository_1.ProductQuestionsRepository,
        personalization_service_1.AbacusPersonalizationService])
], ProductQuestionsService);
//# sourceMappingURL=product-questions.service.js.map