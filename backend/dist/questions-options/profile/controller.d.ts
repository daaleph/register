import { ProfileQuestionsService } from './service';
export declare class ProfileQuestionsController {
    private readonly service;
    constructor(service: ProfileQuestionsService);
    getInitialQuestionWithOptions(): Promise<string>;
    getQuestionWithOptions(uuid: string, questionId: number): Promise<string>;
}
