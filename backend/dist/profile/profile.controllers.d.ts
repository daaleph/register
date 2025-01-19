import { ProfileService } from './profile.service';
import { ProfileEntity } from '../entities/profile.entity';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    getProfile(id: string): Promise<ProfileEntity>;
    updateProfile(profile: ProfileEntity): Promise<void>;
}
