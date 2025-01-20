import { BfiQuestionsRepository } from './bfi-questions.repository';
import { AbacusPersonalizationService } from '../../abacus/personalization.service';
export declare class BfiQuestionsService {
    private readonly repository;
    private readonly abacusService;
    constructor(repository: BfiQuestionsRepository, abacusService: AbacusPersonalizationService);
    getQuestion(questionId: number, previousResponses: any[]): Promise<void>;
}
