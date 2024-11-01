import { Module } from '@nestjs/common';
import { SendemailController } from './sendemail.controller';
import { SendemailService } from './sendemail.service';
import { sendemailProviders } from './sendemail.provider';

@Module({
  controllers: [SendemailController],
  imports: [
    // SequelizeModule.forFeature([Users])
  ],
  providers: [SendemailService, ...sendemailProviders],
  exports: [SendemailService, ...sendemailProviders],
})
export class SendemailModule {}
