import { ProductQuestionsRepository } from './product-questions.repository';
import { AbacusPersonalizationService } from '../../abacus/abacus-personalization.service';
export declare class ProductQuestionsService {
    private readonly repository;
    private readonly abacusService;
    constructor(repository: ProductQuestionsRepository, abacusService: AbacusPersonalizationService);
    getQuestion(questionId: number, previousResponses: any[]): Promise<any>;
    storeAnswer(profileId: string, variable: string, answer: number[]): Promise<void>;
}
