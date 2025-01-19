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
exports.ProfileQuestionsService = void 0;
const common_1 = require("@nestjs/common");
const profile_questions_repository_1 = require("../../repositories/profile-questions.repository");
const abacus_personalization_service_1 = require("../../abacus/abacus-personalization.service");
let ProfileQuestionsService = class ProfileQuestionsService {
    constructor(profileQuestionsRepository, abacusPersonalizationService) {
        this.profileQuestionsRepository = profileQuestionsRepository;
        this.abacusPersonalizationService = abacusPersonalizationService;
    }
    async getInitialQuestion() {
        return this.profileQuestionsRepository.findQuestion(1);
    }
    async getInitialOptions() {
        return this.profileQuestionsRepository.findOptions(1);
    }
    async getQuestionById(id) {
        return this.profileQuestionsRepository.findQuestion(id);
    }
    async getOptionsById(id) {
        return this.profileQuestionsRepository.findOptions(id);
    }
};
exports.ProfileQuestionsService = ProfileQuestionsService;
exports.ProfileQuestionsService = ProfileQuestionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [profile_questions_repository_1.ProfileQuestionsRepository,
        abacus_personalization_service_1.AbacusPersonalizationService])
], ProfileQuestionsService);
//# sourceMappingURL=questions.service.js.map