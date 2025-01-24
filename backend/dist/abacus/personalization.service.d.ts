import { HttpService } from '@nestjs/axios';
import { AbacusContextService } from './context.service';
import { ProfileOptionsEntity, ProfileQuestionEntity, PreviousResponsesEntity, BfiQuestionEntity, ProductQuestionEntity } from 'src/entities';
export declare class AbacusPersonalizationService {
    private readonly httpService;
    private readonly contextService;
    constructor(httpService: HttpService, contextService: AbacusContextService);
    personalizesProfileQuestion(question: ProfileQuestionEntity, previousQuestions: ProfileQuestionEntity[], previousResponses: PreviousResponsesEntity[]): Promise<ProfileQuestionEntity>;
    personalizesProfileOptions(options: ProfileOptionsEntity[], previousQuestions: ProfileQuestionEntity[], previousResponses: PreviousResponsesEntity[]): Promise<ProfileOptionsEntity[]>;
    personalizesBfiQuestion(question: BfiQuestionEntity, previousQuestions: BfiQuestionEntity[], previousResponses: PreviousResponsesEntity[]): Promise<BfiQuestionEntity>;
    personalizesBfiOptions(options: ProfileOptionsEntity[], previousQuestions: ProfileQuestionEntity[], previousResponses: PreviousResponsesEntity[]): Promise<ProfileOptionsEntity[]>;
    personalizesProductQuestion(question: ProfileQuestionEntity, previousQuestions: ProductQuestionEntity[], previousResponses: PreviousResponsesEntity[]): Promise<BfiQuestionEntity>;
    personalizesProductOptions(options: ProfileOptionsEntity[], previousQuestions: ProductQuestionEntity[], previousResponses: PreviousResponsesEntity[]): Promise<ProfileOptionsEntity[]>;
    private personalizeProfileQuestion;
    private personalizeBfiQuestion;
    private personalizeProductQuestion;
    private personalizeProfileOptions;
    private personalizeBfiOptions;
    private personalizeProductOptions;
}
