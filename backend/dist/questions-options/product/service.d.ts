import { ProductQuestionsRepository } from '../../repositories/questions/product';
import { AbacusPersonalizationService } from '../../abacus/personalization.service';
import { BfiQuestionsRepository, ProfileQuestionsRepository } from 'src/repositories/questions';
import { ProductOptionEntity, ProductQuestionEntity } from 'src/entities';
export declare class ProductQuestionsService {
    private readonly profileRepository;
    private readonly bfiRepository;
    private readonly repository;
    private readonly personalizationService;
    constructor(profileRepository: ProfileQuestionsRepository, bfiRepository: BfiQuestionsRepository, repository: ProductQuestionsRepository, personalizationService: AbacusPersonalizationService);
    getContextualizedInitialQuestion(uuid: string): Promise<ProductQuestionEntity>;
    getContextualizedInitialOptions(uuid: string): Promise<ProductOptionEntity[]>;
    getContextualizedQuestionById(uuid: string, id: number): Promise<ProductQuestionEntity>;
    getContextualizedOptionsById(uuid: string, id: number): Promise<ProductOptionEntity[]>;
    getQuestionById(id: number): Promise<ProductQuestionEntity>;
    getOptionsById(id: number): Promise<ProductOptionEntity[]>;
}
