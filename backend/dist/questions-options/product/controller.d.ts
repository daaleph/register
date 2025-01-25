import { ProductQuestionsService } from './service';
export declare class ProductQuestionsController {
    private readonly service;
    constructor(service: ProductQuestionsService);
    getInitialQuestionWithOptions(uuid: string): Promise<string>;
    getProfiledQuestionWithOptions(uuid: string, questionId: number): Promise<string>;
}
