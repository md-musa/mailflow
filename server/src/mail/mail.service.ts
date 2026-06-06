import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> | null = null;

  constructor(private readonly prisma: PrismaService) { }

  private async getTransporter() {
    if (this.transporter) return this.transporter;

    const testAccount = await nodemailer.createTestAccount();
    this.transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    console.log('🟢 Ethereal test account created');
    console.log(`   user: ${testAccount.user}`);
    console.log(`   pass: ${testAccount.pass}`);

    return this.transporter;
  }

  async sendEmail(data: { to: string; subject: string; html: string }) {
    // console.log(`🟢 Email is sending to ${data.to}`);
    const { to, subject, html } = data;

    try {
      const transporter = await this.getTransporter();
      const info = await transporter.sendMail({
        from: 'MailFlow <no-reply@example.com>',
        to,
        subject,
        html,
      });

      const previewUrl = nodemailer.getTestMessageUrl(info);
      // console.log(`✅ Email sent. Preview URL: ${previewUrl}`);

      return { messageId: info.messageId, previewUrl };
    } catch (error: any) {
      console.error('Failed to send email via Ethereal:', error.message || error);
      throw new UnprocessableEntityException(error.message || error);
    }
  }

  async create(createMailDto: CreateMailDto) {
    return await this.prisma.emailJob.create({
      data: createMailDto,
    });
  }

  async findAll() {
    return await this.prisma.emailJob.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.emailJob.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateMailDto: UpdateMailDto) {
    return await this.prisma.emailJob.update({
      where: { id },
      data: updateMailDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.emailJob.delete({
      where: { id },
    });
  }
}
