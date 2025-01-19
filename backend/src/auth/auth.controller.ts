import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body('profileId') profileId: string) {
    if (!profileId) {
      throw new UnauthorizedException('Profile ID is required');
    }
    return this.authService.login(profileId);
  }

  @Post('finalize')
  async finalizeRegistration(@Body('profileId') profileId: string) {
    return this.authService.login(profileId);
  }
}
