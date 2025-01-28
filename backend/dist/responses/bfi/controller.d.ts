import { Service } from './service';
export declare class BfiResponsesController {
    private readonly responsesService;
    constructor(responsesService: Service);
    submitAnswer(profileId: string, variable: string, answer: number[]): Promise<void>;
}
