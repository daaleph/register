import { HttpService } from '@nestjs/axios';
import { AbacusContextService } from './context.service';
import { ProfileOptionsEntity, ProfileQuestionsEntity, ProfileResponsesEntity } from 'src/entities';
export declare class AbacusPersonalizationService {
    private readonly httpService;
    private readonly contextService;
    constructor(httpService: HttpService, contextService: AbacusContextService);
    personalizesProfileQuestion(question: ProfileQuestionsEntity, previousQuestions: ProfileQuestionsEntity[], previousResponses: ProfileResponsesEntity[]): Promise<ProfileQuestionsEntity>;
    personalizesProfileOptions(options: ProfileOptionsEntity[], previousQuestions: ProfileQuestionsEntity[], previousResponses: ProfileResponsesEntity[]): Promise<ProfileOptionsEntity[]>;
    personalizesBFIQuestion(question: ProfileQuestionsEntity, previousQuestions: any[], previousResponses: any[]): Promise<any>;
    personalizesProductQuestion(question: ProfileQuestionsEntity, previousQuestions: any[], previousResponses: any[]): Promise<any>;
    private personalizeQuestion;
    private personalizeOptions;
}
