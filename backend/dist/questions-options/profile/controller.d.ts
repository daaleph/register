import { ProfileQuestionsService } from './service';
export declare class ProfileQuestionsController {
    private readonly service;
    constructor(service: ProfileQuestionsService);
    getInitialQuestionWithOptions(): Promise<string>;
    getQuestionWithOptions(profileId: string, questionId: number): Promise<string>;
}
