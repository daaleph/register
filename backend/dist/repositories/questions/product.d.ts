import { SupabaseService } from '../../supabase/service';
import { ProductQuestionEntity } from 'src/entities';
import { ProductOptionEntity } from 'src/entities';
import { ProfileQuestionsRepository } from './profile';
import { BfiQuestionsRepository } from './bfi';
export declare class ProductQuestionsRepository {
    private readonly supabaseService;
    private readonly profileRepository;
    private readonly bfiRepository;
    constructor(supabaseService?: SupabaseService, profileRepository?: ProfileQuestionsRepository, bfiRepository?: BfiQuestionsRepository);
    getPreviousQuestions(currentId: number): Promise<any>;
    getPreviousResponses(uuid: string, currentId: number): Promise<any>;
    findQuestion(id: number): Promise<ProductQuestionEntity>;
    findOptions(id: number): Promise<ProductOptionEntity[]>;
    saveResponse(response: {
        profile: string;
        variable: string;
        answer_options: number[];
        date_answer: Date;
    }): Promise<void>;
}
