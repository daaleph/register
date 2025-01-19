import { SupabaseService } from 'src/supabase/supabase.service';
import { ProfileOptionsEntity } from 'src/entities/profile-options.entity';
import { ProfileResponsesEntity } from 'src/entities/profile-responses.entity';
import { ProfileQuestionsEntity } from 'src/entities/profile-questions.entity';
export declare class ProfileQuestionsRepository {
    private readonly supabaseService;
    constructor(supabaseService?: SupabaseService);
    findQuestion(id: number): Promise<ProfileQuestionsEntity>;
    findOptions(id: number): Promise<ProfileOptionsEntity>;
    findNextQuestionBasedOnAnswer(currentId: number, previousAnswer: number[] | number): Promise<ProfileQuestionsEntity>;
    getPreviousResponses(currentId: number): Promise<any[]>;
    findAndCustomizeQuestion(id: number, personalizedQuestion: any): Promise<ProfileQuestionsEntity>;
    saveProfileResponse(response: ProfileResponsesEntity): Promise<ProfileResponsesEntity>;
}
