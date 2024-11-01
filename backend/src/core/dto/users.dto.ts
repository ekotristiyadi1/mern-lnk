import { ApiProperty } from '@nestjs/swagger';
import { Users } from '../models/users.models';

export class UsersDto {
  readonly id: string;

  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly password: string;

  @ApiProperty()
  readonly verified_at: Date | string;

  @ApiProperty()
  readonly created_at: Date | string;

  @ApiProperty()
  readonly updated_at: Date | string;

  @ApiProperty()
  readonly deleted_at: Date | string;

  constructor(user: Users) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.verified_at = user.verified_at;
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
    this.deleted_at = user.deleted_at;
  }
}
