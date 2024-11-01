import { ApiProperty } from '@nestjs/swagger';

export class LoggerDto {
  readonly id: number;
  @ApiProperty()
  readonly time_access: string;
  @ApiProperty()
  readonly duration: string;
  @ApiProperty()
  readonly ip: string;
  @ApiProperty()
  readonly url: string;
  @ApiProperty()
  readonly method: string;
  @ApiProperty()
  readonly input: string;
  @ApiProperty()
  readonly output: string;
  @ApiProperty()
  readonly status_code: string;
}
