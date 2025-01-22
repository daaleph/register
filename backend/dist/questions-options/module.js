"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionsModule = void 0;
const common_1 = require("@nestjs/common");
const module_1 = require("./profile/module");
const bfi_questions_module_1 = require("./bfi/bfi-questions.module");
const product_questions_module_1 = require("./product/product-questions.module");
const module_2 = require("../abacus/module");
let QuestionsModule = class QuestionsModule {
};
exports.QuestionsModule = QuestionsModule;
exports.QuestionsModule = QuestionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            module_1.ProfileQuestionsModule,
            bfi_questions_module_1.BfiQuestionsModule,
            product_questions_module_1.ProductQuestionsModule,
            module_2.AbacusModule
        ],
        exports: [module_1.ProfileQuestionsModule, bfi_questions_module_1.BfiQuestionsModule, product_questions_module_1.ProductQuestionsModule]
    })
], QuestionsModule);
//# sourceMappingURL=module.js.map