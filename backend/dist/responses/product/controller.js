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
exports.ProductResponsesController = void 0;
const common_1 = require("@nestjs/common");
const service_1 = require("./service");
let ProductResponsesController = class ProductResponsesController {
    constructor(responsesService) {
        this.responsesService = responsesService;
    }
    async submitAnswer(profileId, variable, answer) {
        await this.responsesService.saveAnswerOfSpecificQuestion(profileId, variable, Array.isArray(answer) ? answer : [answer]);
    }
    async submitOtherAnswer(profileId, variable, answer) {
        await this.responsesService.saveOtherAnswerOfSpecificQuestion(profileId, variable, answer);
    }
};
exports.ProductResponsesController = ProductResponsesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('profileId')),
    __param(1, (0, common_1.Body)('variable')),
    __param(2, (0, common_1.Body)('answer')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ProductResponsesController.prototype, "submitAnswer", null);
__decorate([
    (0, common_1.Post)('other'),
    __param(0, (0, common_1.Body)('profileId')),
    __param(1, (0, common_1.Body)('variable')),
    __param(2, (0, common_1.Body)('answer')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ProductResponsesController.prototype, "submitOtherAnswer", null);
exports.ProductResponsesController = ProductResponsesController = __decorate([
    (0, common_1.Controller)('responses/product'),
    __metadata("design:paramtypes", [service_1.Service])
], ProductResponsesController);
//# sourceMappingURL=controller.js.map