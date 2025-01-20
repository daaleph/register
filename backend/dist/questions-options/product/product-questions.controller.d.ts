import { ProductQuestionsService } from './product-questions.service';
export declare class ProductQuestionsController {
    private readonly service;
    constructor(service: ProductQuestionsService);
    getQuestion(id: number): Promise<void>;
    saveAnswer(variable: string, profileId: string, answer: number[]): Promise<void>;
}
