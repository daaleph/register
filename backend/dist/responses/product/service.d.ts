import { Repository } from '../../repositories/responses/product';
export declare class Service {
    private readonly repository;
    constructor(repository: Repository);
    saveAnswerOfSpecificQuestion(profile: string, variable: string, answer_options: number[]): Promise<any>;
    saveOtherAnswerOfSpecificQuestion(profile: string, variable: string, answer: string): Promise<any>;
}
