import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import envConfig from 'src/config/env.config';
import axios from 'axios';

@Injectable()
export class MailService {
  constructor(private readonly prisma: PrismaService) { }

  async sendEmail(data: { to: string; subject: string; html: string }) {
    console.log(`🟢 Email is sending to ${data.to}`);
    const { to, subject, html } = data;

    try {
      await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        {
          sender: { email: envConfig().brevo.senderEmail, name: "MailFlow" },
          to: [{ email: to }],
          subject,
          htmlContent: html,
        },
        {
          headers: {
            "api-key": envConfig().brevo.apiKey || "",
            "Content-Type": "application/json",
          },
        },
      );

    } catch (error: any) {
      console.error("Failed to send email via Brevo API:", error.response?.data || error.message);
      throw new UnprocessableEntityException(error.response?.data || error.message);
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
