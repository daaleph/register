import { ProductQuestionsService } from './service';
export declare class ProductQuestionsController {
    private readonly service;
    constructor(service: ProductQuestionsService);
    getInitialQuestionWithOptions(profileId: string): Promise<string>;
    getProfiledQuestionWithOptions(profileId: string, questionId: number): Promise<string>;
}
