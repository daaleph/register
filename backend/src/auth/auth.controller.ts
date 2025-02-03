// backend/src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Get,
  Headers,
  BadRequestException,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { RateLimitGuard } from 'src/guards/rateLimit';
import { CsrfService } from './csrf.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly csrfService: CsrfService,
  ) {}

  @Get('csrf-token')
  @UseGuards(RateLimitGuard)
  getCsrfToken(@Res() res: Response) {

    const { csrfToken, expiresIn } = this.csrfService.generateToken();
    res.cookie('csrf-token', csrfToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
      maxAge: expiresIn,
      path: '/',
    });

    return res.json({
      csrfToken: csrfToken,
      expiresIn,
    });

  }

  @Post('login')
  @UseGuards(RateLimitGuard)
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {

    if (!email) throw new UnauthorizedException('Profile ID is required');
    if (!password) throw new BadRequestException('Password is required');

    return this.authService.login(email, password);

  }

  @Get('validate')
  async validateToken(@Headers('Authorization') authHeader: string) {

    if (!authHeader) throw new UnauthorizedException('Authorization header is required');
    const token = authHeader.split(' ')[1];

    return this.authService.validateToken(token);

  }

  @Post('finalize')
  async finalizeRegistration(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {

    if (!email) throw new UnauthorizedException('Profile ID is required');
    if (!password) throw new BadRequestException('Password is required');

    return this.authService.finalizeRegistration(email, password);

  }

  @Post('set-password')
  async setPassword(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {

    if (!email) throw new UnauthorizedException('Profile ID is required');
    if (!password) throw new BadRequestException('Password is required');
    
    return this.authService.setPassword(email, password);

  }
}
