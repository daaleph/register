// services/profile.service.ts

import { Injectable } from '@nestjs/common';
import { ProfileEntity } from 'src/entities/profile.entity';
import { ProfileRepository } from 'src/repositories/profile.repository';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async retrieveProfile(id: string): Promise<ProfileEntity> {
    return this.profileRepository.findProfileById(id);
  }

  async updateProfileData(profile: ProfileEntity): Promise<void> {
    await this.profileRepository.saveProfile(profile);
  }
} // [source](search_result_11)
