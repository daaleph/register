import { ProfileQuestionEntity, PreviousResponsesEntity, BfiQuestionEntity, ProductQuestionEntity } from 'src/entities';
import { AbacusContextEntity } from 'src/entities/abacus-context';
type QuestionEntity = ProfileQuestionEntity | BfiQuestionEntity | ProductQuestionEntity;
export declare class AbacusContextService {
    private readonly contextBuilders;
    constructor();
    private buildQuestionContext;
    buildContext(previousQuestions: QuestionEntity[], previousResponses: PreviousResponsesEntity[], questionType: string): AbacusContextEntity;
    private validateQuestionType;
}
export {};
