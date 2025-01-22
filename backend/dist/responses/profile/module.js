"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileResponsesModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const service_1 = require("./service");
const profile_responses_1 = require("../../repositories/profile-responses");
const module_1 = require("../../supabase/module");
let ProfileResponsesModule = class ProfileResponsesModule {
};
exports.ProfileResponsesModule = ProfileResponsesModule;
exports.ProfileResponsesModule = ProfileResponsesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            module_1.SupabaseModule
        ],
        controllers: [controller_1.ProfileResponsesController],
        providers: [
            service_1.Service,
            profile_responses_1.Repository
        ],
        exports: [service_1.Service]
    })
], ProfileResponsesModule);
//# sourceMappingURL=module.js.map