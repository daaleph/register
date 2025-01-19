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
exports.ProfileQuestionsRepository = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
let ProfileQuestionsRepository = class ProfileQuestionsRepository {
    constructor(supabaseService = new supabase_service_1.SupabaseService()) {
        this.supabaseService = supabaseService;
    }
    async findQuestion(id) {
        const variable = `var${String(id).padStart(2, '0')}`;
        const { data } = await this.supabaseService.query('profile_questions', {
            variable,
        });
        return data;
    }
    async findOptions(id) {
        const variable = `var${String(id).padStart(2, '0')}`;
        const { data } = await this.supabaseService.query('profile_options', {
            variable,
        });
        return data;
    }
    async findNextQuestionBasedOnAnswer(currentId, previousAnswer) {
        const { data } = await this.supabaseService.query('profile_questions', {
            id: currentId + 1,
        });
        return data;
    }
    async getPreviousResponses(currentId) {
        const { data } = await this.supabaseService.query('profile_responses', {});
        return data;
    }
    async findAndCustomizeQuestion(id, personalizedQuestion) {
        const baseQuestion = await this.findQuestion(id);
        return {
            ...baseQuestion,
            ...personalizedQuestion
        };
    }
    async saveProfileResponse(response) {
        const { data } = await this.supabaseService.query('profile_responses', response);
        return data;
    }
};
exports.ProfileQuestionsRepository = ProfileQuestionsRepository;
exports.ProfileQuestionsRepository = ProfileQuestionsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], ProfileQuestionsRepository);
//# sourceMappingURL=profile-questions.repository.js.map