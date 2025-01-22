import { ProfileResponsesRepository } from '../../repositories/profile-responses';
export declare class ProfileResponsesService {
    private readonly profileQuestionsRepository;
    constructor(profileQuestionsRepository: ProfileResponsesRepository);
    saveAnswerOfSpecificQuestion(profile: string, variable: string, answer_options: number[]): Promise<any>;
}
