import { ProfileQuestionsRepository } from '../../repositories/profile-questions';
import { AbacusPersonalizationService } from '../../abacus/personalization.service';
import { ProfileQuestionsEntity, ProfileOptionsEntity } from '../../entities';
export declare class ProfileQuestionsService {
    private readonly profileQuestionsRepository;
    private readonly abacusPersonalizationService;
    constructor(profileQuestionsRepository: ProfileQuestionsRepository, abacusPersonalizationService: AbacusPersonalizationService);
    getInitialQuestion(): Promise<ProfileQuestionsEntity>;
    getInitialOptions(): Promise<ProfileOptionsEntity[]>;
    getQuestionById(id: number): Promise<ProfileQuestionsEntity>;
    getOptionsById(id: number): Promise<ProfileOptionsEntity[]>;
    getContextualizedQuestionById(uuid: string, id: number): Promise<ProfileQuestionsEntity>;
    getContextualizedOptionsById(uuid: string, id: number): Promise<ProfileOptionsEntity[]>;
}
