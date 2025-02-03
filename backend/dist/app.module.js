"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const module_1 = require("./profile/module");
const module_2 = require("./questions-options/module");
const module_3 = require("./responses/module");
const module_4 = require("./abacus/module");
const module_5 = require("./supabase/module");
const shared_module_1 = require("./shared/shared.module");
const rateLimit_1 = require("./guards/rateLimit");
const csrf_middleware_1 = require("./middleware/csrf.middleware");
const common_1 = require("@nestjs/common");
const csrf_module_1 = require("./auth/csrf.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(csrf_middleware_1.CsrfMiddleware)
            .exclude({ path: 'auth/csrf-token', method: common_1.RequestMethod.GET })
            .forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            auth_module_1.AuthModule,
            module_1.ProfileModule,
            module_2.QuestionsModule,
            module_3.ResponsesModule,
            module_4.AbacusModule,
            module_5.SupabaseModule,
            shared_module_1.SharedModule,
            csrf_module_1.CsrfModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: rateLimit_1.RateLimitGuard,
            },
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map