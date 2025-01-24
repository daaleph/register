import { ProductQuestionsRepository } from '../../repositories/questions/product';
import { AbacusPersonalizationService } from '../../abacus/personalization.service';
export declare class ProductQuestionsService {
    private readonly repository;
    private readonly abacusService;
    constructor(repository: ProductQuestionsRepository, abacusService: AbacusPersonalizationService);
    getQuestion(questionId: number, previousResponses: any[]): Promise<void>;
    storeAnswer(profileId: string, variable: string, answer: number[]): Promise<void>;
}
