import {
  CanActivate,
  ExecutionContext,
  // ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/module/auth/auth.service';
import { AuthDto } from '../dto/auth.dto';

@Injectable()
export class LocalStrategy implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request?.body);
  }

  async validateRequest(request: Partial<AuthDto>): Promise<any> {
    const user = await this.authService.validateUser(
      request.email ?? request.username,
      request.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid user credentials');
    }
    return user;
  }
}
