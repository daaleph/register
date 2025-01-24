import { ProfileQuestionsService } from './service';
export declare class ProfileQuestionsController {
    private readonly service;
    constructor(service: ProfileQuestionsService);
    getInitialProfileQuestion(): Promise<string>;
    getProfiledQuestion(uuid: string, questionId: number): Promise<string>;
}
