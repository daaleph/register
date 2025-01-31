import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SupabaseService } from '../supabase/service';
import { ProfileEntity } from 'src/entities/profile';
import { randomBytes, scrypt as scryptCallback } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(scryptCallback);

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly supabaseService: SupabaseService,
  ) {}

  async profileExists(email: string) {
    const profile = await this.supabaseService
      .getConnection()
      .from('profile')
      .select('*')
      .eq('email', email)
      .single();
    if (!profile.data) throw new UnauthorizedException('Invalid credentials');
    return profile.data;
  }

  async login(email: string, password: string): Promise<{ accessToken: string }> {
    const profile = await this.profileExists(email);
    const passwordHash = profile.password;
    if (!passwordHash) {
      throw new UnauthorizedException('Invaluid credentials');
    }

    const [salt, storedHash] = passwordHash.split(':');
    const hashedPassword = (await scrypt(password, salt, 64)) as Buffer;

    if (hashedPassword.toString('hex') !== storedHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: profile.id,
      email: (profile as ProfileEntity).email,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async finalizeRegistration(email: string, password: string): Promise<{ accessToken: string }> {
    await this.setPassword(email, password);
    return this.login(email, password);
  }

  async setPassword(email: string, password: string): Promise<{ message: string }> {
    await this.profileExists(email);
    if (password.length < 8) {
      throw new BadRequestException('Password must be at least 8 characters long');
    }
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = (await scrypt(password, salt, 64)) as Buffer;
    const passwordHash = `${salt}:${hashedPassword.toString('hex')}`;
    const { error } = await this.supabaseService
      .getConnection()
      .from('profile')
      .update({ password: passwordHash })
      .eq('email', email);
    if (error) throw new BadRequestException('Failed to set password');
    return { message: 'Password set successfully' };
  }

  async verifyPassword(profileId: string, password: string): Promise<boolean> {
    const profile = await this.profileExists(profileId);
    const passwordHash = profile.password;
    if (!passwordHash) throw new UnauthorizedException('Password not set for this profile');
    const [salt, storedHash] = passwordHash.split(':');
    const hashedPassword = (await scrypt(password, salt, 64)) as Buffer;
    return hashedPassword.toString('hex') === storedHash;
  }
}