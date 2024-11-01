import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { SendemailService } from './sendemail.service';
import { SendEmail } from 'src/core/models/sendemail.models';
import { SendEmailDto } from 'src/core/dto/sendemail.dto';
import { ApiOkResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

@Controller('sendemail')
export class SendemailController {
  constructor(private readonly mailerService: SendemailService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createEmail(@Body() body: { email: string; description: string }) {
    const { email, description } = body;
    // Send the email
    const sendResult = await this.mailerService.sendMail(
      email,
      'New Notification',
      description,
    );

    // Return both database and send status
    return {
      message: 'Email sent and stored successfully',
      sendResult,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('get')
  findAll(): Promise<SendEmail[]> {
    return this.mailerService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('get/:id')
  @ApiOkResponse({ type: SendEmailDto })
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<any> {
    const data = await this.mailerService.findOne(id);
    return { data: data };
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<SendEmailDto>,
  ): Promise<Partial<SendEmail>> {
    try {
      const data = new SendEmail();
      Object.assign(data, updateUserDto);
      return await this.mailerService.update(id, data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string): Promise<SendEmail> {
    return this.mailerService.remove(id);
  }
}
