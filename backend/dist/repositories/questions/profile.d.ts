import { SupabaseService } from 'src/supabase/service';
import { ProfileOptionEntity } from 'src/entities/profile/options';
import { ResponsesEntity } from 'src/entities/responses';
import { ProfileQuestionEntity } from 'src/entities/profile/question';
export declare class ProfileQuestionsRepository {
    private readonly supabaseService;
    constructor(supabaseService?: SupabaseService);
    findQuestion(id: number): Promise<ProfileQuestionEntity>;
    findOptions(id: number): Promise<ProfileOptionEntity[]>;
    getPreviousQuestions(currentId: number): Promise<any[]>;
    getAllQuestions(): Promise<any[]>;
    getPreviousResponses(uuid: string, currentId: number): Promise<any[]>;
    getAllResponses(uuid: string): Promise<any[]>;
    saveProfileResponse(response: ResponsesEntity): Promise<ResponsesEntity>;
}
