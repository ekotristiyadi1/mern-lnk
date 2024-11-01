import { ApiProperty } from '@nestjs/swagger';
import { SendEmail } from '../models/sendemail.models';

export class SendEmailDto {
  readonly id: string;
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly created_at: Date;

  @ApiProperty()
  readonly updated_at: Date;

  constructor(data: SendEmail) {
    this.id = data.id;
    this.email = data.email;
    this.description = data.description;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }
}
