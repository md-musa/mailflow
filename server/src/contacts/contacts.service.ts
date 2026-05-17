import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContactsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createContactDto: CreateContactDto) {
    const contact = await this.prisma.contact.create({
      data: createContactDto
    })
    return contact;
  }

  async findAll() {
    return await this.prisma.contact.findMany({});
  }

  async findOne(id: string) {
    return await this.prisma.contact.findUnique({
      where: { id }
    })
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    return await this.prisma.contact.update({
      where: { id },
      data: updateContactDto
    })
  }

  async remove(id: string) {
    return await this.prisma.contact.delete({
      where: { id }
    })

  }
}
