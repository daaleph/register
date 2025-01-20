import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SupabaseService } from '../supabase/service';
import { ProfileEntity } from 'src/entities/profile';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly supabaseService: SupabaseService,
  ) {}

  async login(profileId: string) {
    // Verify profile exists in database
    const profile = await this.supabaseService
      .getConnection()
      .from('profile')
      .select('*')
      .eq('id', profileId)
      .single();

    if (!profile) {
      throw new UnauthorizedException('Profile not found');
    }

    const payload = {
      sub: profileId,
      email: (profile as unknown as ProfileEntity).email,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateToken(token: string) {
    try {
      return await this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
