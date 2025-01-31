// backend/src/profile/controllers.ts
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ProfileEntity } from 'src/entities';
import { ProfileService } from './service';
import { RateLimitGuard } from 'src/guards/rateLimit';

@Controller('profile')
export class ProfileController {

  constructor(private readonly profileService: ProfileService) {}

  @Get('')
  @UseGuards(RateLimitGuard)
  async getProfile(
    @Param('id') id: string
  ): Promise<ProfileEntity> {
    return this.profileService.retrieveProfile(id);
  }

  @Post('create')
  @UseGuards(RateLimitGuard)
  async createProfile(
    @Body() profile: ProfileEntity
  ): Promise<{ id: string }> {
    console.log("oasidjfoasidfj");
    const id = await this.profileService.createProfile(profile);
    console.log("xxxxxxxxxxxxx");
    return { id };
  }

  @Post()
  @UseGuards(RateLimitGuard)
  async updateProfile(
    @Body() profile: ProfileEntity
  ): Promise<void> {
    await this.profileService.updateProfileData(profile);
  }

}