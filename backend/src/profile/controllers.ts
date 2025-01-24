// backend/src/profile/controllers.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProfileEntity } from 'src/entities';
import { ProfileService } from './service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('create')
  async createProfile(@Body() profile: ProfileEntity): Promise<{ id: string }> {
    const id = await this.profileService.createProfile(profile);
    return { id };
  }

  @Get(':id')
  async getProfile(@Param('id') id: string): Promise<ProfileEntity> {
    return this.profileService.retrieveProfile(id);
  }

  @Post()
  async updateProfile(@Body() profile: ProfileEntity): Promise<void> {
    await this.profileService.updateProfileData(profile);
  }
}