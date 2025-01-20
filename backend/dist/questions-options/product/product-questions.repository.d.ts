import { SupabaseService } from '../../supabase/service';
import { ProductQuestionsEntity } from '../../entities/question';
export declare class ProductQuestionsRepository {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    findQuestion(id: number): Promise<ProductQuestionsEntity>;
    findOptions(variable: string): Promise<any>;
    saveResponse(response: {
        profile: string;
        variable: string;
        answer_options: number[];
        date_answer: Date;
    }): Promise<void>;
}
