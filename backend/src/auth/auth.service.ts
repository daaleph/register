// backend/src/auth/auth.service.ts
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SupabaseService } from '../supabase/service';
import { ProfileEntity } from 'src/entities/profile';
import { randomBytes, pbkdf2Sync } from 'crypto';

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

    if (!profile.data) {
      throw new UnauthorizedException('Profile not found');
    }

    return profile.data;
  }

  async login(email: string, password: string): Promise<{ accessToken: string }> {
    const profile = await this.profileExists(email);

    // Retrieve the stored password hash
    const passwordHash = profile.password;
    if (!passwordHash) {
      throw new UnauthorizedException('Password not set for this profile');
    }

    // Split the stored hash into salt and hashed password
    const [salt, storedHash] = passwordHash.split(':');

    // Hash the provided password with the same salt
    const hashedPassword = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    // Compare the hashed password with the stored hash
    if (hashedPassword !== storedHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT payload
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
    // Set the password during finalization
    await this.setPassword(email, password);
    return this.login(email, password);
  }

  async setPassword(email: string, password: string): Promise<{ message: string }> {
    await this.profileExists(email);

    // Validate password strength (example: minimum 8 characters)
    if (password.length < 8) {
      throw new BadRequestException('Password must be at least 8 characters long');
    }

    // Generate a salt
    const salt = randomBytes(16).toString('hex');

    // Hash the password using PBKDF2
    const hashedPassword = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    // Combine the salt and hashed password for storage
    const passwordHash = `${salt}:${hashedPassword}`;

    // Update the password in the database
    const { error } = await this.supabaseService
      .getConnection()
      .from('profile')
      .update({ password: passwordHash })
      .eq('email', email);

    if (error) {
      throw new BadRequestException('Failed to set password');
    }

    return { message: 'Password set successfully' };
  }

  async verifyPassword(profileId: string, password: string): Promise<boolean> {
    const profile = await this.profileExists(profileId);

    // Retrieve the stored password hash
    const passwordHash = profile.password;
    if (!passwordHash) {
      throw new UnauthorizedException('Password not set for this profile');
    }

    // Split the stored hash into salt and hashed password
    const [salt, storedHash] = passwordHash.split(':');

    // Hash the provided password with the same salt
    const hashedPassword = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    // Compare the hashed password with the stored hash
    return hashedPassword === storedHash;
  }
}