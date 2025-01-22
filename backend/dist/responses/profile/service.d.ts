import { Repository } from '../../repositories/profile-responses';
export declare class Service {
    private readonly repository;
    constructor(repository: Repository);
    saveAnswerOfSpecificQuestion(profile: string, variable: string, answer_options: number[]): Promise<any>;
    saveOtherAnswerOfSpecificQuestion(profile: string, variable: string, answer: string, nature: number): Promise<any>;
}
