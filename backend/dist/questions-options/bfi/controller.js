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
exports.BfiQuestionsController = void 0;
const common_1 = require("@nestjs/common");
const service_1 = require("./service");
const rateLimit_1 = require("../../guards/rateLimit");
let BfiQuestionsController = class BfiQuestionsController {
    constructor(service) {
        this.service = service;
    }
    async getInitialQuestionWithOptions(profileId) {
        const question = await this.service.getContextualizedInitialQuestion(profileId);
        const options = await this.service.getContextualizedInitialOptions(profileId);
        return JSON.stringify({ question, options });
    }
    async getProfiledQuestionWithOptions(profileId, questionId) {
        const question = await this.service.getContextualizedQuestionById(profileId, questionId);
        const options = await this.service.getContextualizedOptionsById(profileId, questionId);
        return JSON.stringify({ question, options });
    }
};
exports.BfiQuestionsController = BfiQuestionsController;
__decorate([
    (0, common_1.Get)('initial'),
    (0, common_1.UseGuards)(rateLimit_1.RateLimitGuard),
    __param(0, (0, common_1.Body)('profileId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BfiQuestionsController.prototype, "getInitialQuestionWithOptions", null);
__decorate([
    (0, common_1.Get)('questionId/:questionId'),
    (0, common_1.UseGuards)(rateLimit_1.RateLimitGuard),
    __param(0, (0, common_1.Body)('profileId')),
    __param(1, (0, common_1.Param)('questionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], BfiQuestionsController.prototype, "getProfiledQuestionWithOptions", null);
exports.BfiQuestionsController = BfiQuestionsController = __decorate([
    (0, common_1.Controller)('questions/bfi'),
    __metadata("design:paramtypes", [service_1.BfiQuestionsService])
], BfiQuestionsController);
//# sourceMappingURL=controller.js.map