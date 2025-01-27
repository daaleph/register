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
const product_1 = require("../../repositories/questions/product");
const personalization_service_1 = require("../../abacus/personalization.service");
const questions_1 = require("../../repositories/questions");
let ProductQuestionsService = class ProductQuestionsService {
    constructor(profileRepository, bfiRepository, repository, personalizationService) {
        this.profileRepository = profileRepository;
        this.bfiRepository = bfiRepository;
        this.repository = repository;
        this.personalizationService = personalizationService;
    }
    async getContextualizedInitialQuestion(uuid) {
        const profileQuestions = await this.profileRepository.getAllQuestions();
        const profileResponses = await this.profileRepository.getAllResponses(uuid);
        const bfiQuestions = await this.bfiRepository.getAllQuestions();
        const bfiResponses = await this.bfiRepository.getAllResponses(uuid);
        const currentQuestion = await this.repository.findQuestion(1);
        const personalizedQuestion = await this.personalizationService.personalizesBfiQuestion(currentQuestion, { profile: profileQuestions, bfi: bfiQuestions }, { profile: profileResponses, bfi: bfiResponses });
        currentQuestion.description_en = personalizedQuestion.description_en;
        currentQuestion.description_es = personalizedQuestion.description_es;
        return currentQuestion;
    }
    async getContextualizedInitialOptions(uuid) {
        const profileQuestions = await this.profileRepository.getAllQuestions();
        const profileResponses = await this.profileRepository.getAllResponses(uuid);
        const bfiQuestions = await this.bfiRepository.getAllQuestions();
        const bfiResponses = await this.bfiRepository.getAllResponses(uuid);
        const currentOptions = await this.repository.findOptions(1);
        const personalizedOptions = await this.personalizationService.personalizesBfiOptions(currentOptions, { profile: profileQuestions, bfi: bfiQuestions }, { profile: profileResponses, bfi: bfiResponses });
        currentOptions.map((currentOption, index) => {
            currentOption.description_en = personalizedOptions[index].description_en;
            currentOption.description_es = personalizedOptions[index].description_es;
        });
        return currentOptions;
    }
    async getContextualizedQuestionById(uuid, id) {
        const profileQuestions = await this.profileRepository.getAllQuestions();
        const profileResponses = await this.profileRepository.getAllResponses(uuid);
        const previousQuestions = await this.repository.getPreviousQuestions(id);
        const previousResponses = await this.repository.getPreviousResponses(uuid, id);
        const question = await this.getQuestionById(id);
        const personalizedQuestion = await this.personalizationService.personalizesBfiQuestion(question, { profile: profileQuestions, bfi: previousQuestions }, { profile: profileResponses, bfi: previousResponses });
        question.description_en = personalizedQuestion.description_en;
        question.description_es = personalizedQuestion.description_es;
        return question;
    }
    async getContextualizedOptionsById(uuid, id) {
        const profileQuestions = await this.profileRepository.getAllQuestions();
        const profileResponses = await this.profileRepository.getAllResponses(uuid);
        const previousQuestions = await this.repository.getPreviousQuestions(id);
        const previousResponses = await this.repository.getPreviousResponses(uuid, id);
        const options = await this.getOptionsById(1);
        const personalizedOptions = this.personalizationService.personalizesBfiOptions(options, { profile: profileQuestions, bfi: previousQuestions }, { profile: profileResponses, bfi: previousResponses });
        options.map((currentOption, index) => {
            currentOption.description_en = personalizedOptions[index].description_en;
            currentOption.description_es = personalizedOptions[index].description_es;
        });
        return options;
    }
    async getQuestionById(id) {
        return this.repository.findQuestion(id);
    }
    async getOptionsById(id) {
        return this.repository.findOptions(id);
    }
};
exports.ProductQuestionsService = ProductQuestionsService;
exports.ProductQuestionsService = ProductQuestionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [questions_1.ProfileQuestionsRepository,
        questions_1.BfiQuestionsRepository,
        product_1.ProductQuestionsRepository,
        personalization_service_1.AbacusPersonalizationService])
], ProductQuestionsService);
//# sourceMappingURL=service.js.map