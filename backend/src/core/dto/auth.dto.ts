import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty()
  readonly username?: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly password: string;

  @ApiProperty()
  readonly token?: string;
}
