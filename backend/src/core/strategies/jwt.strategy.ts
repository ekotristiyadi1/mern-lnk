// src/auth/jwt.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Users } from 'src/core/models/users.models';
import { UsersService } from 'src/module/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWTKEY,
    });
  }

  async validate(payload: any): Promise<Users> {
    const isExp = await this.checkIsExpiredJwt(payload.exp);
    if (!isExp) {
      throw new UnauthorizedException('Token is expired, please re auth again');
    }
    const user = await this.userService.findByUsernameOrEmail(
      payload?.user?.email ?? payload?.user?.username,
    );
    if (!user) {
      throw new UnauthorizedException(
        'You are not authorized to perform the operation',
      );
    }
    return user;
  }

  checkIsExpiredJwt(jwtExp: number) {
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (jwtExp > currentTimestamp) {
      return true;
    }
    return false;
  }
}
