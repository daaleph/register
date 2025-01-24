import { SupabaseService } from '../../supabase/service';
import { BfiOptionsEntity } from 'src/entities/bfi/options';
import { ResponsesEntity } from 'src/entities/responses';
import { BfiQuestionsEntity } from 'src/entities/bfi/question';
import { ProfileQuestionsRepository } from '../../repositories/questions/profile';
export declare class BfiQuestionsRepository {
    private readonly supabaseService;
    private readonly profileRepository;
    constructor(supabaseService?: SupabaseService, profileRepository?: ProfileQuestionsRepository);
    findQuestion(id: number): Promise<BfiQuestionsEntity>;
    findOptions(id: number): Promise<BfiOptionsEntity[]>;
    getPreviousQuestions(currentId: number): Promise<any>;
    getPreviousResponses(uuid: string, currentId: number): Promise<any>;
    findAndCustomizeQuestion(id: number, personalizedQuestion: any): Promise<BfiQuestionsEntity>;
    saveResponse(response: ResponsesEntity): Promise<ResponsesEntity>;
}
