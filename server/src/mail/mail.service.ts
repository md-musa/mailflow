import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MailService {
  constructor(private readonly prisma: PrismaService) { }

  async sendEmail(data: { to: string, subject: string, html: string }) {
    console.log(`🟢 Eamil is sending to ${data.to}`)

    // return await this.prisma.emailJob.update({
    //   where: { id },
    //   data: {
    //     status: "SENT",
    //     sentAt: new Date()
    //   }
    // })
  }

  async create(createMailDto: CreateMailDto) {
    return await this.prisma.emailJob.create({
      data: createMailDto
    })
  }

  async findAll() {
    return await this.prisma.emailJob.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.emailJob.findUnique({
      where: { id },
    })
  }

  async update(id: string, updateMailDto: UpdateMailDto) {
    return await this.prisma.emailJob.update({
      where: { id },
      data: updateMailDto
    })
  }

  async remove(id: string) {
    return await this.prisma.emailJob.delete({
      where: { id },
    })
  }

}
