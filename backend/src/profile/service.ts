// backend/src/profile/service.ts

import { Injectable } from '@nestjs/common';
import { ProfileEntity } from 'src/entities/profile';
import { ProfileRepository } from 'src/repositories/profile';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async createProfile(profile: ProfileEntity): Promise<string> {
    return this.profileRepository.createProfile(profile);
  }

  async retrieveProfile(id: string): Promise<ProfileEntity> {
    return this.profileRepository.findProfileById(id);
  }

  async updateProfileData(profile: ProfileEntity): Promise<void> {
    await this.profileRepository.saveProfile(profile);
  }
}
