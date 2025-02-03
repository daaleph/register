import { ProfileEntity } from 'src/entities';
import { ProfileService } from './service';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    getProfile(id: string): Promise<ProfileEntity>;
    createProfile(profile: ProfileEntity): Promise<{
        id: string;
    }>;
}
