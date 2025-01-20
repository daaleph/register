"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BfiQuestionsModule = void 0;
const common_1 = require("@nestjs/common");
const bif_questions_controller_1 = require("./bif-questions.controller");
const bfi_questions_service_1 = require("./bfi-questions.service");
const bfi_questions_repository_1 = require("./bfi-questions.repository");
const module_1 = require("../../abacus/module");
const module_2 = require("../../supabase/module");
let BfiQuestionsModule = class BfiQuestionsModule {
};
exports.BfiQuestionsModule = BfiQuestionsModule;
exports.BfiQuestionsModule = BfiQuestionsModule = __decorate([
    (0, common_1.Module)({
        imports: [module_1.AbacusModule, module_2.SupabaseModule],
        controllers: [bif_questions_controller_1.BfiQuestionsController],
        providers: [bfi_questions_service_1.BfiQuestionsService, bfi_questions_repository_1.BfiQuestionsRepository],
        exports: [bfi_questions_service_1.BfiQuestionsService]
    })
], BfiQuestionsModule);
//# sourceMappingURL=bfi-questions.module.js.map