import { BfiQuestionsService } from './service';
export declare class BfiQuestionsController {
    private readonly service;
    constructor(service: BfiQuestionsService);
    getInitialQuestionWithOptions(uuid: string): Promise<string>;
    getProfiledQuestionWithOptions(uuid: string, questionId: number): Promise<string>;
}
