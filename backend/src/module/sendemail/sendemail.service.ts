import { Inject, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendEmail } from 'src/core/models/sendemail.models';
import { SENDEMAIL_REPOSITORY } from 'src/core/providers/constants';

@Injectable()
export class SendemailService {
  constructor(
    @Inject(SENDEMAIL_REPOSITORY)
    private readonly sendemailRepository: typeof SendEmail,
    // @InjectModel(Users) private readonly userRepository: typeof Users,
  ) {}
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  async sendMail(to: string, subject: string, text: string) {
    const payload = {
      email: to,
      description: text,
      created_at: new Date(),
      updated_at: new Date(),
    } as SendEmail;
    const newSendEmail = await this.sendemailRepository.create(payload);

    const mailOptions = {
      from: process.env.MAIL_USER,
      to,
      subject,
      text,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return { data: newSendEmail, message: 'Email sent successfully' };
    } catch (error) {
      throw new Error(`Error sending email: ${error.message}`);
    }
  }

  async findAll() {
    return this.sendemailRepository.findAll();
  }

  async findOne(id: string) {
    return this.sendemailRepository.findByPk(id);
  }

  async update(id: string, data: SendEmail) {
    await this.sendemailRepository.update(data, { where: { id } });
    return this.sendemailRepository.findByPk(id);
  }

  async remove(id: string) {
    const data = await this.findOne(id);
    await data.destroy();
    return data;
  }
}
