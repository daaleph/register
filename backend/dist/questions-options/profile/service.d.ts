import { ProfileQuestionsRepository } from '../../repositories/questions/profile';
import { AbacusPersonalizationService } from '../../abacus/personalization.service';
import { ProfileQuestionEntity, ProfileOptionEntity } from '../../entities';
export declare class ProfileQuestionsService {
    private readonly repository;
    private readonly abacusPersonalizationService;
    constructor(repository: ProfileQuestionsRepository, abacusPersonalizationService: AbacusPersonalizationService);
    getInitialQuestion(): Promise<ProfileQuestionEntity>;
    getInitialOptions(): Promise<ProfileOptionEntity[]>;
    getContextualizedQuestionById(uuid: string, id: number): Promise<ProfileQuestionEntity>;
    getContextualizedOptionsById(uuid: string, id: number): Promise<ProfileOptionEntity[]>;
    getQuestionById(id: number): Promise<ProfileQuestionEntity>;
    getOptionsById(id: number): Promise<ProfileOptionEntity[]>;
}
