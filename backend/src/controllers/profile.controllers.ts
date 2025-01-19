// controllers/profile.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import { ProfileEntity } from '../entities/profile.entity';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':id')
  async getProfile(@Param('id') id: string): Promise<ProfileEntity> {
    return this.profileService.retrieveProfile(id);
  }

  @Post()
  async updateProfile(@Body() profile: ProfileEntity): Promise<void> {
    await this.profileService.updateProfileData(profile);
  }
} // [source](search_result_11)
