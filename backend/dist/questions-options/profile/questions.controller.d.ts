import { ProfileQuestionsService } from './questions.service';
export declare class ProfileQuestionsController {
    private readonly profileQuestionsService;
    constructor(profileQuestionsService: ProfileQuestionsService);
    getInitialProfileQuestion(): Promise<{
        profileQuestion: import("../../entities").ProfileQuestionsEntity;
        profileOptions: import("../../entities/profile-options.entity").ProfileOptionsEntity;
    }>;
    getProfileQuestion(questionId: number): Promise<{
        profileQuestion: import("../../entities").ProfileQuestionsEntity;
        profileOptions: import("../../entities/profile-options.entity").ProfileOptionsEntity;
    }>;
}
