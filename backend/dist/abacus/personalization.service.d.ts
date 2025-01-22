import { HttpService } from '@nestjs/axios';
import { AbacusContextService } from './context.service';
import { ProfileOptionsEntity, ProfileQuestionsEntity, ProfilePreviousResponsesEntity } from 'src/entities';
export declare class AbacusPersonalizationService {
    private readonly httpService;
    private readonly contextService;
    constructor(httpService: HttpService, contextService: AbacusContextService);
    personalizesProfileQuestion(question: ProfileQuestionsEntity, previousQuestions: ProfileQuestionsEntity[], previousResponses: ProfilePreviousResponsesEntity[]): Promise<ProfileQuestionsEntity>;
    personalizesProfileOptions(options: ProfileOptionsEntity[], previousQuestions: ProfileQuestionsEntity[], previousResponses: ProfilePreviousResponsesEntity[]): Promise<ProfileOptionsEntity[]>;
    personalizesBFIQuestion(question: ProfileQuestionsEntity, previousQuestions: any[], previousResponses: any[]): Promise<any>;
    personalizesProductQuestion(question: ProfileQuestionsEntity, previousQuestions: any[], previousResponses: any[]): Promise<any>;
    private personalizeQuestion;
    private personalizeOptions;
}
