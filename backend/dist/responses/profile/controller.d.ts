import { ProfileResponsesService } from './service';
export declare class ProfileResponsesController {
    private readonly profileResponsesService;
    constructor(profileResponsesService: ProfileResponsesService);
    submitProfileAnswer(profileId: string, variable: string, answer: number[] | number): Promise<void>;
}
