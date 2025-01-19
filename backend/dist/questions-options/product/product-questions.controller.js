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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductQuestionsController = void 0;
const common_1 = require("@nestjs/common");
const product_questions_service_1 = require("./product-questions.service");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
let ProductQuestionsController = class ProductQuestionsController {
    constructor(service) {
        this.service = service;
    }
    async getQuestion(id) {
        return this.service.getQuestion(id, []);
    }
    async saveAnswer(variable, profileId, answer) {
        await this.service.storeAnswer(profileId, variable, answer);
    }
};
exports.ProductQuestionsController = ProductQuestionsController;
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductQuestionsController.prototype, "getQuestion", null);
__decorate([
    (0, common_1.Post)(':variable'),
    __param(0, (0, common_1.Param)('variable')),
    __param(1, (0, common_1.Body)('profileId')),
    __param(2, (0, common_1.Body)('answer')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Array]),
    __metadata("design:returntype", Promise)
], ProductQuestionsController.prototype, "saveAnswer", null);
exports.ProductQuestionsController = ProductQuestionsController = __decorate([
    (0, common_1.Controller)('questions/product'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [product_questions_service_1.ProductQuestionsService])
], ProductQuestionsController);
//# sourceMappingURL=product-questions.controller.js.map