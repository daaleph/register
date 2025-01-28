"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BfiResponsesModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const service_1 = require("./service");
const bfi_1 = require("../../repositories/responses/bfi");
const module_1 = require("../../supabase/module");
let BfiResponsesModule = class BfiResponsesModule {
};
exports.BfiResponsesModule = BfiResponsesModule;
exports.BfiResponsesModule = BfiResponsesModule = __decorate([
    (0, common_1.Module)({
        imports: [module_1.SupabaseModule],
        controllers: [controller_1.BfiResponsesController],
        providers: [
            service_1.Service,
            bfi_1.Repository
        ],
        exports: [service_1.Service]
    })
], BfiResponsesModule);
//# sourceMappingURL=module.js.map