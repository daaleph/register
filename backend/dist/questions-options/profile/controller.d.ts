import { ProfileQuestionsService } from './service';
export declare class ProfileQuestionsController {
    private readonly profileQuestionsService;
    constructor(profileQuestionsService: ProfileQuestionsService);
    getInitialProfileQuestion(): Promise<string>;
    getProfiledQuestion(uuid: string, questionId: number): Promise<string>;
}
