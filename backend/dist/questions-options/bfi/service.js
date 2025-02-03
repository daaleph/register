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
const personalization_service_1 = require("../../abacus/personalization.service");
const questions_1 = require("../../repositories/questions");
let BfiQuestionsService = class BfiQuestionsService {
    constructor(repository, profileRepository, personalizationService) {
        this.repository = repository;
        this.profileRepository = profileRepository;
        this.personalizationService = personalizationService;
    }
    async getContextualizedInitialQuestion(uuid) {
        const profileQuestions = await this.profileRepository.getAllQuestions();
        const profileResponses = await this.profileRepository.getAllResponses(uuid);
        const question = await this.repository.findQuestion(1);
        const personalizedQuestion = await this.personalizationService.personalizesBfiQuestion(question, { profile: profileQuestions }, { profile: profileResponses });
        question.description_en = personalizedQuestion.description_en;
        question.description_es = personalizedQuestion.description_es;
        return question;
    }
    async getContextualizedInitialOptions(uuid) {
        const profileQuestions = await this.profileRepository.getAllQuestions();
        const profileResponses = await this.profileRepository.getAllResponses(uuid);
        const options = await this.repository.findOptions();
        const personalizedOptions = await this.personalizationService.personalizesBfiOptions(options, { profile: profileQuestions }, { profile: profileResponses });
        options.map((currentOption, index) => {
            currentOption.description_en = personalizedOptions[index].description_en;
            currentOption.description_es = personalizedOptions[index].description_es;
        });
        return options;
    }
    async getContextualizedQuestionById(uuid, id) {
        const question = await this.getQuestionById(id);
        const previousQuestions = await this.repository.getPreviousQuestions(id);
        const previousResponses = await this.repository.getPreviousResponses(uuid, id);
        const personalizedQuestion = await this.personalizationService.personalizesBfiQuestion(question, {
            profile: previousQuestions.profileQuestions,
            bfi: previousQuestions.bfiQuestions,
        }, {
            profile: previousResponses.profileResponses,
            bfi: previousResponses.bfiResponses,
        });
        question.description_en = personalizedQuestion.description_en;
        question.description_es = personalizedQuestion.description_es;
        return question;
    }
    async getContextualizedOptionsById(uuid, id) {
        const options = await this.getOptionsById();
        const previousQuestions = await this.repository.getPreviousQuestions(id);
        const previousResponses = await this.repository.getPreviousResponses(uuid, id);
        const personalizedOptions = await this.personalizationService.personalizesBfiOptions(options, {
            profile: previousQuestions.profileQuestions,
            bfi: previousQuestions.bfiQuestions,
        }, {
            profile: previousResponses.profileResponses,
            bfi: previousResponses.bfiResponses,
        });
        options.map((currentOption, index) => {
            currentOption.description_en = personalizedOptions[index].description_en;
            currentOption.description_es = personalizedOptions[index].description_es;
        });
        return options;
    }
    async getQuestionById(id) {
        return this.repository.findQuestion(id);
    }
    async getOptionsById() {
        return this.repository.findOptions();
    }
};
exports.BfiQuestionsService = BfiQuestionsService;
exports.BfiQuestionsService = BfiQuestionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [questions_1.BfiQuestionsRepository,
        questions_1.ProfileQuestionsRepository,
        personalization_service_1.AbacusPersonalizationService])
], BfiQuestionsService);
//# sourceMappingURL=service.js.map