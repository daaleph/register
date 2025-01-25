import { AbacusPersonalizationService } from '../../abacus/personalization.service';
import { BfiQuestionEntity, BfiOptionEntity } from '../../entities';
import { BfiQuestionsRepository, ProfileQuestionsRepository } from 'src/repositories/questions';
export declare class BfiQuestionsService {
    private readonly repository;
    private readonly profileRepository;
    private readonly personalizationService;
    constructor(repository: BfiQuestionsRepository, profileRepository: ProfileQuestionsRepository, personalizationService: AbacusPersonalizationService);
    getContextualizedInitialQuestion(uuid: string): Promise<BfiQuestionEntity>;
    getContextualizedInitialOptions(uuid: string): Promise<BfiOptionEntity[]>;
    getContextualizedQuestionById(uuid: string, id: number): Promise<BfiQuestionEntity>;
    getContextualizedOptionsById(uuid: string, id: number): Promise<BfiOptionEntity[]>;
    getQuestionById(id: number): Promise<BfiQuestionEntity>;
    getOptionsById(): Promise<BfiOptionEntity[]>;
}
