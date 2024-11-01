import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from 'src/module/users/users.service';

@Injectable()
export class CheckIsUserExistGuard implements CanActivate {
  constructor(private readonly userService: UsersService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request?.body);
  }

  async validateRequest(request) {
    const userExist = await this.userService.findByUsernameOrEmail(
      request.email ?? request.username,
    );
    if (userExist) {
      throw new ForbiddenException('This email already exist');
    }
    return request;
  }
}
