import { BfiQuestionsRepository } from '../../repositories/questions/bfi';
import { AbacusPersonalizationService } from '../../abacus/personalization.service';
import { BfiQuestionEntity, BfiOptionsEntity } from '../../entities';
export declare class BfiQuestionsService {
    private readonly repository;
    private readonly abacusPersonalizationService;
    constructor(repository: BfiQuestionsRepository, abacusPersonalizationService: AbacusPersonalizationService);
    getInitialQuestion(): Promise<BfiQuestionEntity>;
    getInitialOptions(): Promise<BfiOptionsEntity[]>;
    getQuestionById(id: number): Promise<BfiQuestionEntity>;
    getOptionsById(id: number): Promise<BfiOptionsEntity[]>;
    getContextualizedQuestionById(uuid: string, id: number): Promise<BfiQuestionEntity>;
    getContextualizedOptionsById(uuid: string, id: number): Promise<BfiOptionsEntity[]>;
}
