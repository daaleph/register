import { SupabaseService } from 'src/supabase/service';
import { ProfileOptionsEntity } from 'src/entities/profile/options';
import { ResponsesEntity } from 'src/entities/responses';
import { ProfileQuestionsEntity } from 'src/entities/profile/question';
export declare class ProfileQuestionsRepository {
    private readonly supabaseService;
    constructor(supabaseService?: SupabaseService);
    findQuestion(id: number): Promise<ProfileQuestionsEntity>;
    findOptions(id: number): Promise<ProfileOptionsEntity[]>;
    getPreviousQuestions(currentId: number): Promise<any[]>;
    getAllQuestions(): Promise<any[]>;
    getPreviousResponses(uuid: string, currentId: number): Promise<any[]>;
    getAllResponses(uuid: string): Promise<any[]>;
    findAndCustomizeQuestion(id: number, personalizedQuestion: any): Promise<ProfileQuestionsEntity>;
    saveProfileResponse(response: ResponsesEntity): Promise<ResponsesEntity>;
}
