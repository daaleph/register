import { BfiQuestionsService } from './bfi-questions.service';
export declare class BfiQuestionsController {
    private readonly service;
    constructor(service: BfiQuestionsService);
    getQuestion(id: number): Promise<void>;
}
