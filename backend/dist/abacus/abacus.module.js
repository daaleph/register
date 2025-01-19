"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbacusModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const abacus_personalization_service_1 = require("./abacus-personalization.service");
const abacus_context_service_1 = require("./abacus-context.service");
let AbacusModule = class AbacusModule {
};
exports.AbacusModule = AbacusModule;
exports.AbacusModule = AbacusModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        providers: [abacus_personalization_service_1.AbacusPersonalizationService, abacus_context_service_1.AbacusContextService],
        exports: [abacus_personalization_service_1.AbacusPersonalizationService]
    })
], AbacusModule);
//# sourceMappingURL=abacus.module.js.map