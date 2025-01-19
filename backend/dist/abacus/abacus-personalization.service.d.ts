import { HttpService } from '@nestjs/axios';
import { AbacusContextService } from './abacus-context.service';
export declare class AbacusPersonalizationService {
    private readonly httpService;
    private readonly contextService;
    constructor(httpService: HttpService, contextService: AbacusContextService);
    personalizesProfileQuestion(questionId: number, previousResponses: any[]): Promise<any>;
    personalizesBFIQuestion(questionId: number, previousResponses: any[]): Promise<any>;
    personalizesProductQuestion(questionId: number, previousResponses: any[]): Promise<any>;
    private personalizeQuestion;
}
