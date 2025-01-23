import { ProfileEntity } from 'src/entities';
import { ProfileService } from './service';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    createProfile(profile: ProfileEntity): Promise<{
        id: string;
    }>;
    getProfile(id: string): Promise<ProfileEntity>;
    updateProfile(profile: ProfileEntity): Promise<void>;
}
