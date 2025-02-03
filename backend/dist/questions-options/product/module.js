"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductQuestionsModule = void 0;
const common_1 = require("@nestjs/common");
const module_1 = require("../../abacus/module");
const module_2 = require("../../supabase/module");
const service_1 = require("./service");
const questions_1 = require("../../repositories/questions");
const controller_1 = require("./controller");
let ProductQuestionsModule = class ProductQuestionsModule {
};
exports.ProductQuestionsModule = ProductQuestionsModule;
exports.ProductQuestionsModule = ProductQuestionsModule = __decorate([
    (0, common_1.Module)({
        imports: [module_1.AbacusModule, module_2.SupabaseModule],
        controllers: [controller_1.ProductQuestionsController],
        providers: [
            service_1.ProductQuestionsService,
            questions_1.ProductQuestionsRepository,
            questions_1.ProfileQuestionsRepository,
            questions_1.BfiQuestionsRepository,
        ],
        exports: [service_1.ProductQuestionsService],
    })
], ProductQuestionsModule);
//# sourceMappingURL=module.js.map