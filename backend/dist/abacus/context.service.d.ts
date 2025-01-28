import { ProfileQuestionEntity, PreviousResponsesEntity, BfiQuestionEntity, ProductQuestionEntity } from 'src/entities';
import { AbacusContextEntity } from 'src/entities/abacus-context';
export declare class AbacusContextService {
    private readonly contextBuilders;
    constructor();
    buildContext(questions: {
        profile?: ProfileQuestionEntity[];
        bfi?: BfiQuestionEntity[];
        product?: ProductQuestionEntity[];
    }, responses: {
        profile?: PreviousResponsesEntity[];
        bfi?: PreviousResponsesEntity[];
        product?: PreviousResponsesEntity[];
    }, questionType: string): AbacusContextEntity;
    private buildQuestionContext;
    private calculateTotalQuestions;
    private validateQuestionType;
}
