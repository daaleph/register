import { ProfileQuestionsEntity, ProfilePreviousResponsesEntity } from 'src/entities';
import { AbacusContextEntity } from 'src/entities/abacus-context';
export declare class AbacusContextService {
    buildContext(previousQuestions: ProfileQuestionsEntity[], previousResponses: ProfilePreviousResponsesEntity[], questionType: string): AbacusContextEntity;
}
