"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductResponsesModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const service_1 = require("./service");
const product_1 = require("../../repositories/responses/product");
const module_1 = require("../../supabase/module");
let ProductResponsesModule = class ProductResponsesModule {
};
exports.ProductResponsesModule = ProductResponsesModule;
exports.ProductResponsesModule = ProductResponsesModule = __decorate([
    (0, common_1.Module)({
        imports: [module_1.SupabaseModule],
        controllers: [controller_1.ProductResponsesController],
        providers: [
            service_1.Service,
            product_1.Repository
        ],
        exports: [service_1.Service]
    })
], ProductResponsesModule);
//# sourceMappingURL=module.js.map