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
const bfi_questions_repository_1 = require("./bfi-questions.repository");
const personalization_service_1 = require("../../abacus/personalization.service");
let BfiQuestionsService = class BfiQuestionsService {
    constructor(repository, abacusService) {
        this.repository = repository;
        this.abacusService = abacusService;
    }
    async getQuestion(questionId, previousResponses) {
    }
};
exports.BfiQuestionsService = BfiQuestionsService;
exports.BfiQuestionsService = BfiQuestionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [bfi_questions_repository_1.BfiQuestionsRepository,
        personalization_service_1.AbacusPersonalizationService])
], BfiQuestionsService);
//# sourceMappingURL=bfi-questions.service.js.map