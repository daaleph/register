import { ProfileQuestionsRepository } from '../../repositories/profile-questions';
import { AbacusPersonalizationService } from '../../abacus/personalization.service';
import { ProfileQuestionsEntity } from '../../entities/profile-questions';
import { ProfileOptionsEntity } from 'src/entities/profile-options';
export declare class ProfileQuestionsService {
    private readonly profileQuestionsRepository;
    private readonly abacusPersonalizationService;
    constructor(profileQuestionsRepository: ProfileQuestionsRepository, abacusPersonalizationService: AbacusPersonalizationService);
    getInitialQuestion(): Promise<ProfileQuestionsEntity>;
    getInitialOptions(): Promise<ProfileOptionsEntity[]>;
    getQuestionById(id: number): Promise<ProfileQuestionsEntity>;
    getOptionsById(id: number): Promise<ProfileOptionsEntity[]>;
    getContextualizedQuestionById(id: number): Promise<ProfileQuestionsEntity>;
    getContextualizedOptionsById(id: number): Promise<ProfileOptionsEntity[]>;
}
