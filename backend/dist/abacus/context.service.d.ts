import { ProfileQuestionsEntity, ProfileResponsesEntity } from 'src/entities';
export declare class AbacusContextService {
    buildContext(previousQuestions: ProfileQuestionsEntity[], previousResponses: ProfileResponsesEntity[], questionType: string): {
        [key: string]: any;
    };
}
