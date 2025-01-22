import { ProfileService } from './service';
import { ProfileEntity } from '../entities/profile';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    createProfile(profile: ProfileEntity): Promise<{
        id: string;
    }>;
    getProfile(id: string): Promise<ProfileEntity>;
    updateProfile(profile: ProfileEntity): Promise<void>;
}
