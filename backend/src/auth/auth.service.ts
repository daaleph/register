// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(profileId: string) {
    const payload = { sub: profileId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}// [source](search_result_2)