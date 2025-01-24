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
exports.ProfileQuestionsController = void 0;
const common_1 = require("@nestjs/common");
const service_1 = require("./service");
let ProfileQuestionsController = class ProfileQuestionsController {
    constructor(service) {
        this.service = service;
    }
    async getInitialProfileQuestion() {
        const question = await this.service.getInitialQuestion();
        const options = await this.service.getInitialOptions();
        return JSON.stringify({ question, options });
    }
    async getProfiledQuestion(uuid, questionId) {
        const question = await this.service.getContextualizedQuestionById(uuid, questionId);
        const options = await this.service.getContextualizedOptionsById(uuid, questionId);
        return JSON.stringify({ question, options });
    }
};
exports.ProfileQuestionsController = ProfileQuestionsController;
__decorate([
    (0, common_1.Get)('initial'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProfileQuestionsController.prototype, "getInitialProfileQuestion", null);
__decorate([
    (0, common_1.Get)('questionId/:questionId'),
    __param(0, (0, common_1.Param)('uuid')),
    __param(1, (0, common_1.Param)('questionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], ProfileQuestionsController.prototype, "getProfiledQuestion", null);
exports.ProfileQuestionsController = ProfileQuestionsController = __decorate([
    (0, common_1.Controller)('questions/profile/:uuid'),
    __metadata("design:paramtypes", [service_1.ProfileQuestionsService])
], ProfileQuestionsController);
//# sourceMappingURL=controller.js.map