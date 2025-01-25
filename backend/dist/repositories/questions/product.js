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
exports.ProductQuestionsRepository = void 0;
const common_1 = require("@nestjs/common");
const service_1 = require("../../supabase/service");
const profile_1 = require("./profile");
const bfi_1 = require("./bfi");
let ProductQuestionsRepository = class ProductQuestionsRepository {
    constructor(supabaseService = new service_1.SupabaseService(), profileRepository = new profile_1.ProfileQuestionsRepository(), bfiRepository = new bfi_1.BfiQuestionsRepository()) {
        this.supabaseService = supabaseService;
        this.profileRepository = profileRepository;
        this.bfiRepository = bfiRepository;
    }
    async getPreviousQuestions(currentId) {
        const variables = Array.from({ length: currentId }, (_, i) => `var${String(i + 1).padStart(2, '0')}`);
        const profileQuestions = this.profileRepository.getAllQuestions();
        const bfiQuestions = this.bfiRepository.getAllQuestions();
        const { data } = await this.supabaseService
            .getConnection()
            .from('bfi_questions')
            .select()
            .in('variable', variables);
        return { data, profileQuestions, bfiQuestions };
    }
    async getPreviousResponses(uuid, currentId) {
        const variables = Array.from({ length: currentId }, (_, i) => `var${String(i + 1).padStart(2, '0')}`);
        const profileResponses = this.profileRepository.getAllResponses(uuid);
        const bfiResponses = this.bfiRepository.getAllResponses(uuid);
        const { data } = await this.supabaseService
            .getConnection()
            .from('bfi_responses_with_descriptions')
            .select()
            .in('variable', variables)
            .eq('profile', uuid);
        return { data, profileResponses, bfiResponses };
    }
    async findQuestion(id) {
        const variable = `var${String(id).padStart(2, '0')}`;
        const { data } = await this.supabaseService.query('product_questions', {
            variable,
        });
        return Array.isArray(data) ? data[0] : data;
    }
    async findOptions(id) {
        const variable = `var${String(id).padStart(2, '0')}`;
        const { data } = await this.supabaseService.query('product_options', {
            variable,
        });
        return data;
    }
    async saveResponse(response) {
        await this.supabaseService.query('product_responses', response);
    }
};
exports.ProductQuestionsRepository = ProductQuestionsRepository;
exports.ProductQuestionsRepository = ProductQuestionsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [service_1.SupabaseService,
        profile_1.ProfileQuestionsRepository,
        bfi_1.BfiQuestionsRepository])
], ProductQuestionsRepository);
//# sourceMappingURL=product.js.map