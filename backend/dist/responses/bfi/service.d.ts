import { Repository } from '../../repositories/responses/bfi';
export declare class Service {
    private readonly repository;
    constructor(repository: Repository);
    saveAnswer(profile: string, variable: string, answer_options: number[]): Promise<any>;
}
