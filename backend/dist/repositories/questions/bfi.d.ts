import { SupabaseService } from '../../supabase/service';
import { BfiQuestionEntity } from 'src/entities';
import { BfiOptionEntity } from 'src/entities';
import { ResponsesEntity } from 'src/entities/responses';
import { ProfileQuestionsRepository } from './profile';
export declare class BfiQuestionsRepository {
    private readonly supabaseService;
    private readonly profileRepository;
    constructor(supabaseService?: SupabaseService, profileRepository?: ProfileQuestionsRepository);
    getPreviousQuestions(currentId: number): Promise<any>;
    getAllQuestions(): Promise<any[]>;
    getPreviousResponses(uuid: string, currentId: number): Promise<any>;
    getAllResponses(uuid: string): Promise<any[]>;
    findQuestion(id: number): Promise<BfiQuestionEntity>;
    findOptions(): Promise<BfiOptionEntity[]>;
    saveResponse(response: ResponsesEntity): Promise<ResponsesEntity>;
}
