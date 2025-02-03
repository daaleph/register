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
exports.Repository = void 0;
const common_1 = require("@nestjs/common");
const service_1 = require("../../supabase/service");
let Repository = class Repository {
    constructor(supabaseService = new service_1.SupabaseService()) {
        this.supabaseService = supabaseService;
    }
    async saveResponse(response) {
        const connection = this.supabaseService.getConnection();
        const { data, error } = await connection.from('profile_responses').insert([
            {
                profile: response.profile,
                variable: response.variable,
                answer_options: response.answer_options,
            },
        ]);
        if (error) {
            throw new Error(`Failed to insert profile response: ${error.message}`);
        }
        return data;
    }
    async saveOtherResponse(profile, variable, answer) {
        const connection = this.supabaseService.getConnection();
        const { data, error } = await connection.from('others').insert([
            {
                profile,
                variable,
                answer,
                nature: 1,
            },
        ]);
        if (error) {
            throw new Error(`Failed to insert profile response: ${error.message}`);
        }
        return data;
    }
};
exports.Repository = Repository;
exports.Repository = Repository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [service_1.SupabaseService])
], Repository);
//# sourceMappingURL=profile.js.map