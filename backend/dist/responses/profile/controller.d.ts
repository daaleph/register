import { Service } from './service';
export declare class ProfileResponsesController {
    private readonly responsesService;
    constructor(responsesService: Service);
    submitAnswer(profileId: string, variable: string, answer: number[] | number): Promise<void>;
    submitOtherAnswer(profileId: string, variable: string, answer: string, nature: number): Promise<void>;
}
