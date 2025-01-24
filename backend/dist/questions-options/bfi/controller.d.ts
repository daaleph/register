import { BfiQuestionsService } from './service';
export declare class BfiQuestionsController {
    private readonly service;
    constructor(service: BfiQuestionsService);
    getInitialProfileQuestion(): Promise<string>;
    getProfiledQuestion(uuid: string, questionId: number): Promise<string>;
}
