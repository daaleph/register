import { SupabaseService } from '../../supabase/service';
import { BfiQuestionsEntity } from '../../entities/question';
export declare class BfiQuestionsRepository {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    findQuestion(id: number): Promise<BfiQuestionsEntity>;
    findOptions(questionId: number): Promise<any>;
    saveResponse(response: {
        profile: string;
        var01_var44: number;
    }): Promise<void>;
}
