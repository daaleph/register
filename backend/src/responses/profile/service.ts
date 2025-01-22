// backend/src/responses/profile/service.ts

import { Injectable } from '@nestjs/common';
import { ProfileResponsesRepository } from '../../repositories/profile-responses'

@Injectable()
export class ProfileResponsesService {

    constructor(
        private readonly profileQuestionsRepository: ProfileResponsesRepository
    ) {}

    async saveAnswerOfSpecificQuestion(
        profile: string,
        variable: string,
        answer_options: number[]
    ): Promise<any> {
        this.profileQuestionsRepository.saveProfileResponse({profile, variable, answer_options});
    }

}