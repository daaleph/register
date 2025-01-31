import { BfiQuestionsService } from './service';
export declare class BfiQuestionsController {
    private readonly service;
    constructor(service: BfiQuestionsService);
    getInitialQuestionWithOptions(profileId: string): Promise<string>;
    getProfiledQuestionWithOptions(profileId: string, questionId: number): Promise<string>;
}
