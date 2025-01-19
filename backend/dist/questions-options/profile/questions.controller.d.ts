import { ProfileQuestionsService } from './questions.service';
export declare class ProfileQuestionsController {
    private readonly profileQuestionsService;
    constructor(profileQuestionsService: ProfileQuestionsService);
    getInitialProfileQuestion(): Promise<{
        profileQuestion: import("../../entities").ProfileQuestionsEntity;
        profileOptions: import("../../entities/profile-options.entity").ProfileOptionsEntity;
    }>;
    getProfileQuestion(questionId: number): Promise<import("../../entities").ProfileQuestionsEntity>;
    submitProfileAnswer(questionId: number, data: {
        profileId: string;
        variable: string;
        answer: number[] | number;
    }): Promise<{
        nextQuestion: import("../../entities").ProfileQuestionsEntity;
        response: import("../../entities").ProfileResponsesEntity;
    }>;
}
