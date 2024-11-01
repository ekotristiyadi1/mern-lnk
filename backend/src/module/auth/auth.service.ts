// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthDto } from 'src/core/dto/auth.dto';
import { Auth } from 'src/core/models/auth.models';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(payload: Auth) {
    const user = await this.validateUser(
      payload.username ?? payload.email,
      payload.password,
    );
    const token = await this.generateToken(user);
    return { user, token };
  }

  public async signup(user) {
    // hash the password
    const pass = await this.hashPassword(user.password);

    // create the user
    const newUser = await this.userService.create({
      ...user,
      password: pass,
      verified_at: null,
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      updated_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      deleted_at: null,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = newUser['dataValues'];

    // return the user and the token
    return { user: result };
  }

  async decodeToken(token: string): Promise<any> {
    try {
      const decoded = await this.jwtService.decode(token);
      return decoded;
    } catch (error) {
      // Handle decoding error (e.g., token is invalid or expired)
      console.error('Error decoding token:', error.message);
      return null;
    }
  }

  public async refreshToken(payload: AuthDto) {
    const decode = await this.decodeToken(payload.token);
    if (!decode) {
      throw new Error('Token is invalid');
    }

    const user = await this.userService.findByUsernameOrEmail(
      decode?.user?.email,
    );

    if (!user) {
      throw new Error('User not found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user.toJSON();
    const signPayload = { user: result, sub: user.id };

    return {
      user: result,
      access_token: this.jwtService.sign(signPayload),
    };
  }

  public async logout(payload: AuthDto) {
    const decode = await this.decodeToken(payload.token);
    if (!decode) {
      throw new Error('Token is invalid');
    }

    const user = await this.userService.findByUsernameOrEmail(
      decode?.user?.email,
    );

    if (!user) {
      throw new Error('User not found');
    }

    return {
      user: null,
    };
  }

  public async validateUser(username: string, passwd: string) {
    const user = await this.userService.findByUsernameOrEmail(username);
    if (!user) {
      return null;
    }
    // find if user password match
    const match = await this.comparePassword(passwd, user.password);

    if (!match) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user['dataValues'];
    return result;
  }
  private async generateToken(user) {
    const payload = { user: user, sub: user.userId };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  public async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  public async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
}
