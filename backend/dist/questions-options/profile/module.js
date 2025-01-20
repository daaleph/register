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
const controller_1 = require("./controller");
const service_1 = require("./service");
const profile_questions_1 = require("../../repositories/profile-questions");
const module_1 = require("../../abacus/module");
const module_2 = require("../../supabase/module");
let ProfileQuestionsModule = class ProfileQuestionsModule {
};
exports.ProfileQuestionsModule = ProfileQuestionsModule;
exports.ProfileQuestionsModule = ProfileQuestionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            module_2.SupabaseModule,
            module_1.AbacusModule
        ],
        controllers: [controller_1.ProfileQuestionsController],
        providers: [
            service_1.ProfileQuestionsService,
            profile_questions_1.ProfileQuestionsRepository
        ],
        exports: [service_1.ProfileQuestionsService]
    })
], ProfileQuestionsModule);
//# sourceMappingURL=module.js.map