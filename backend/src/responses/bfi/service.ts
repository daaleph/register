// backend/src/responses/profile/service.ts

import { Injectable } from '@nestjs/common';
import { Repository } from '../../repositories/responses/bfi'

@Injectable()
export class Service {

    constructor(
        private readonly repository: Repository
    ) {}

    async saveAnswer(
        profile: string,
        variable: string,
        answer_options: number[]
    ): Promise<any> {
        this.repository.saveResponse({profile, variable, answer_options});
    }

}