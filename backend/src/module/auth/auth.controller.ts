import { Controller, Post, UseGuards, HttpCode, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthDto } from 'src/core/dto/auth.dto';
import { UsersDto } from 'src/core/dto/users.dto';
import { CheckIsUserExistGuard } from 'src/core/guards/checkIsUserExist.guard';
import { LocalStrategy } from 'src/core/strategies/local.strategy';
import { AuthService } from './auth.service';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalStrategy)
  @Post('login')
  @HttpCode(200)
  @ApiOkResponse({ type: UsersDto })
  @ApiBody({ type: AuthDto })
  async login(@Req() req) {
    return this.authService.login(req.body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('refreshToken')
  @HttpCode(200)
  @ApiOkResponse({ type: UsersDto })
  @ApiBody({ type: AuthDto })
  async refreshToken(@Req() req) {
    return this.authService.refreshToken(req.body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  @HttpCode(200)
  @ApiOkResponse({ type: UsersDto })
  @ApiBody({ type: AuthDto })
  async logout(@Req() req) {
    return this.authService.logout(req.body);
  }

  @UseGuards(CheckIsUserExistGuard)
  @Post('signup')
  @HttpCode(200)
  @ApiOkResponse({ type: UsersDto })
  @ApiBody({ type: UsersDto })
  async signUp(@Req() req) {
    return await this.authService.signup(req.body);
  }
}
