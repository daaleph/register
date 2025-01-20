import { ProfileEntity } from 'src/entities/profile';
import { ProfileRepository } from 'src/repositories/profile';
export declare class ProfileService {
    private readonly profileRepository;
    constructor(profileRepository: ProfileRepository);
    retrieveProfile(id: string): Promise<ProfileEntity>;
    updateProfileData(profile: ProfileEntity): Promise<void>;
}
