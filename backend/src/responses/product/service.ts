// backend/src/responses/product/service.ts

import { Injectable } from '@nestjs/common';
import { Repository } from '../../repositories/responses/product'

@Injectable()
export class Service {

    constructor(
        private readonly repository: Repository
    ) {}

    async saveAnswerOfSpecificQuestion(
        profile: string,
        variable: string,
        answer_options: number[]
    ): Promise<any> {
        this.repository.saveResponse({profile, variable, answer_options});
    }

    async saveOtherAnswerOfSpecificQuestion(
        profile: string,
        variable: string,
        answer: string
    ): Promise<any> {
        this.repository.saveOtherResponse(profile, variable, answer);
    }

}