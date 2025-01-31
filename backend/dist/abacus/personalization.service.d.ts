import { HttpService } from '@nestjs/axios';
import { ProfileOptionEntity, ProfileQuestionEntity, PreviousResponsesEntity, BfiQuestionEntity, BfiOptionEntity, ProductQuestionEntity, ProductOptionEntity } from 'src/entities';
import { AbacusContextService } from './context.service';
export declare class AbacusPersonalizationService {
    private readonly httpService;
    private readonly contextService;
    constructor(httpService: HttpService, contextService: AbacusContextService);
    personalizesProfileQuestion(question: ProfileQuestionEntity, previousQuestions: ProfileQuestionEntity[], previousResponses: PreviousResponsesEntity[]): Promise<ProfileQuestionEntity>;
    personalizesProfileOptions(options: ProfileOptionEntity[], previousQuestions: ProfileQuestionEntity[], previousResponses: PreviousResponsesEntity[]): Promise<ProfileOptionEntity[]>;
    personalizesBfiQuestion(question: BfiQuestionEntity, questions: {
        profile: ProfileQuestionEntity[];
        bfi?: BfiQuestionEntity[];
    }, responses: {
        profile: PreviousResponsesEntity[];
        bfi?: PreviousResponsesEntity[];
    }): Promise<BfiQuestionEntity>;
    personalizesBfiOptions(options: BfiOptionEntity[], questions: {
        profile: ProfileQuestionEntity[];
        bfi?: BfiQuestionEntity[];
    }, responses: {
        profile: PreviousResponsesEntity[];
        bfi?: PreviousResponsesEntity[];
    }): Promise<BfiOptionEntity[]>;
    personalizesProductQuestion(question: ProductQuestionEntity, questions: {
        profile: ProfileQuestionEntity[];
        bfi: BfiQuestionEntity[];
        product?: ProductQuestionEntity[];
    }, responses: {
        profile: PreviousResponsesEntity[];
        bfi: PreviousResponsesEntity[];
        product?: PreviousResponsesEntity[];
    }): Promise<ProductQuestionEntity>;
    personalizesProductOptions(options: ProductOptionEntity[], questions: {
        profile: ProfileQuestionEntity[];
        bfi: BfiQuestionEntity[];
        product?: ProductQuestionEntity[];
    }, responses: {
        profile: PreviousResponsesEntity[];
        bfi: PreviousResponsesEntity[];
        product: PreviousResponsesEntity[];
    }): Promise<BfiOptionEntity[]>;
    private personalizeQuestion;
    private personalizeOptions;
    private createQuestionPayload;
    private createOptionsPayload;
    private makeAbacusRequest;
    private handleError;
}
