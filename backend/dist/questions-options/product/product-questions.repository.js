"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductQuestionsRepository = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../../supabase/supabase.service");
let ProductQuestionsRepository = class ProductQuestionsRepository {
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async findQuestion(id) {
        const { data } = await this.supabaseService.query('product_questions', { id });
        return data;
    }
    async findOptions(variable) {
        const { data } = await this.supabaseService.query('product_options', {
            variable
        });
        return data;
    }
    async saveResponse(response) {
        await this.supabaseService.query('product_responses', response);
    }
};
exports.ProductQuestionsRepository = ProductQuestionsRepository;
exports.ProductQuestionsRepository = ProductQuestionsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], ProductQuestionsRepository);
//# sourceMappingURL=product-questions.repository.js.map