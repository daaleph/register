import { ProfileQuestionsService } from './service';
export declare class ProfileQuestionsController {
    private readonly profileQuestionsService;
    constructor(profileQuestionsService: ProfileQuestionsService);
    getInitialProfileQuestion(): Promise<{
        profileQuestion: import("../../entities").ProfileQuestionsEntity;
        profileOptions: import("../../entities").ProfileOptionsEntity[];
    }>;
    getProfileQuestion(uuid: string, questionId: number): Promise<{
        profileQuestion: import("../../entities").ProfileQuestionsEntity;
        profileOptions: import("../../entities").ProfileOptionsEntity[];
    }>;
}
