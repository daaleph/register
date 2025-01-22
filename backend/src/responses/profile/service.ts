// backend/src/responses/profile/service.ts

import { Injectable } from '@nestjs/common';
import { Repository } from '../../repositories/profile-responses'

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
        answer: string,
        nature: number
    ): Promise<any> {
        this.repository.saveOtherResponse(profile, variable, answer, nature);
    }

}