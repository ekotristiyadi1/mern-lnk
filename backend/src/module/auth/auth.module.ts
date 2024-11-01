import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { usersProviders } from '../users/users.provider';
import { JwtStrategy } from 'src/core/strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWTKEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION ?? '1d' },
    }),
  ],
  exports: [AuthService],
  providers: [AuthService, JwtStrategy, UsersService, ...usersProviders],
  controllers: [AuthController],
})
export class AuthModule {}
