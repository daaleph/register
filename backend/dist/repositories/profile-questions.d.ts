import { SupabaseService } from 'src/supabase/service';
import { ProfileOptionsEntity } from 'src/entities/profile-options';
import { ProfileResponsesEntity } from 'src/entities/profile-responses';
import { ProfileQuestionsEntity } from 'src/entities/profile-questions';
export declare class ProfileQuestionsRepository {
    private readonly supabaseService;
    constructor(supabaseService?: SupabaseService);
    findQuestion(id: number): Promise<ProfileQuestionsEntity>;
    findOptions(id: number): Promise<ProfileOptionsEntity[]>;
    getPreviousQuestions(currentId: number): Promise<any[]>;
    getPreviousResponses(uuid: string, currentId: number): Promise<any[]>;
    findAndCustomizeQuestion(id: number, personalizedQuestion: any): Promise<ProfileQuestionsEntity>;
    saveProfileResponse(response: ProfileResponsesEntity): Promise<ProfileResponsesEntity>;
}
