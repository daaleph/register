import { ProfileQuestionsService } from './service';
import { ProfileOptionsEntity, ProfileQuestionsEntity } from 'src/entities';
export declare class ProfileQuestionsController {
    private readonly profileQuestionsService;
    constructor(profileQuestionsService: ProfileQuestionsService);
    getInitialProfileQuestion(): Promise<{
        question: ProfileQuestionsEntity;
        options: ProfileOptionsEntity[];
    }>;
    getProfiledQuestion(uuid: string, questionId: number): Promise<{
        question: ProfileQuestionsEntity;
        options: ProfileOptionsEntity[];
    }>;
}
