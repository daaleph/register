"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileQuestionsModule = void 0;
const common_1 = require("@nestjs/common");
const questions_controller_1 = require("./questions.controller");
const questions_service_1 = require("./questions.service");
const profile_questions_repository_1 = require("../../repositories/profile-questions.repository");
const abacus_module_1 = require("../../abacus/abacus.module");
const supabase_module_1 = require("../../supabase/supabase.module");
let ProfileQuestionsModule = class ProfileQuestionsModule {
};
exports.ProfileQuestionsModule = ProfileQuestionsModule;
exports.ProfileQuestionsModule = ProfileQuestionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            supabase_module_1.SupabaseModule,
            abacus_module_1.AbacusModule
        ],
        controllers: [questions_controller_1.ProfileQuestionsController],
        providers: [
            questions_service_1.ProfileQuestionsService,
            profile_questions_repository_1.ProfileQuestionsRepository
        ],
        exports: [questions_service_1.ProfileQuestionsService]
    })
], ProfileQuestionsModule);
//# sourceMappingURL=questions.module.js.map