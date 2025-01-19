import { ProfileQuestionsRepository } from '../../repositories/profile-questions.repository';
import { AbacusPersonalizationService } from '../../abacus/abacus-personalization.service';
import { ProfileQuestionsEntity } from '../../entities/profile-questions.entity';
import { ProfileOptionsEntity } from 'src/entities/profile-options.entity';
export declare class ProfileQuestionsService {
    private readonly profileQuestionsRepository;
    private readonly abacusPersonalizationService;
    constructor(profileQuestionsRepository: ProfileQuestionsRepository, abacusPersonalizationService: AbacusPersonalizationService);
    getInitialQuestion(): Promise<ProfileQuestionsEntity>;
    getInitialOptions(): Promise<ProfileOptionsEntity>;
    getQuestionById(id: number): Promise<ProfileQuestionsEntity>;
    getOptionsById(id: number): Promise<ProfileOptionsEntity>;
}
