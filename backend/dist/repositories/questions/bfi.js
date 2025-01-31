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
exports.BfiQuestionsRepository = void 0;
const common_1 = require("@nestjs/common");
const service_1 = require("../../supabase/service");
const profile_1 = require("./profile");
let BfiQuestionsRepository = class BfiQuestionsRepository {
    constructor(supabaseService = new service_1.SupabaseService(), profileRepository = new profile_1.ProfileQuestionsRepository()) {
        this.supabaseService = supabaseService;
        this.profileRepository = profileRepository;
    }
    async getPreviousQuestions(currentId) {
        const profileQuestions = await this.profileRepository.getAllQuestions();
        const variables = Array.from({ length: currentId }, (_, i) => `var${String(i + 1).padStart(2, '0')}`);
        const { data } = await this.supabaseService
            .getConnection()
            .from('bfi_questions')
            .select()
            .in('variable', variables);
        return { bfiQuestions: data, profileQuestions };
    }
    async getAllQuestions() {
        const { data } = await this.supabaseService
            .getConnection()
            .from('bfi_questions')
            .select();
        return data;
    }
    async getPreviousResponses(uuid, currentId) {
        const variables = Array.from({ length: currentId }, (_, i) => `var${String(i + 1).padStart(2, '0')}`);
        const profileResponses = await this.profileRepository.getAllResponses(uuid);
        const { data } = await this.supabaseService
            .getConnection()
            .from('bfi_responses_with_descriptions')
            .select()
            .in('variable', variables)
            .eq('profile', uuid)
            .not('description_en', 'is', null);
        return { bfiResponses: data, profileResponses };
    }
    async getAllResponses(uuid) {
        const { data } = await this.supabaseService
            .getConnection()
            .from('bfi_responses_with_descriptions')
            .select()
            .eq('profile', uuid);
        return data;
    }
    async findQuestion(id) {
        const variable = `var${String(id).padStart(2, '0')}`;
        const { data } = await this.supabaseService.query('bfi_questions', {
            variable,
        });
        return data[0];
    }
    async findOptions() {
        const { data } = await this.supabaseService
            .getConnection()
            .from('bfi_options')
            .select();
        return data;
    }
    async saveResponse(response) {
        const { data } = await this.supabaseService.query('bfi_responses', response);
        return data;
    }
};
exports.BfiQuestionsRepository = BfiQuestionsRepository;
exports.BfiQuestionsRepository = BfiQuestionsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [service_1.SupabaseService,
        profile_1.ProfileQuestionsRepository])
], BfiQuestionsRepository);
//# sourceMappingURL=bfi.js.map