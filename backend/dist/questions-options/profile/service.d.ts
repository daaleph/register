import { ProfileQuestionsRepository } from '../../repositories/questions/profile';
import { AbacusPersonalizationService } from '../../abacus/personalization.service';
import { ProfileQuestionEntity, ProfileOptionsEntity } from '../../entities';
export declare class ProfileQuestionsService {
    private readonly repository;
    private readonly abacusPersonalizationService;
    constructor(repository: ProfileQuestionsRepository, abacusPersonalizationService: AbacusPersonalizationService);
    getInitialQuestion(): Promise<ProfileQuestionEntity>;
    getInitialOptions(): Promise<ProfileOptionsEntity[]>;
    getQuestionById(id: number): Promise<ProfileQuestionEntity>;
    getOptionsById(id: number): Promise<ProfileOptionsEntity[]>;
    getContextualizedQuestionById(uuid: string, id: number): Promise<ProfileQuestionEntity>;
    getContextualizedOptionsById(uuid: string, id: number): Promise<ProfileOptionsEntity[]>;
}
