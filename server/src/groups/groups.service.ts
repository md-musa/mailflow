import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GroupsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createGroupDto: CreateGroupDto, userId: string) {
    const group = await this.prisma.group.create({
      data: {
        ...createGroupDto,
        createdById: userId,
      },
    });

    return group;

  }

  async findAll(userId: string) {
    return await this.prisma.group.findMany({
      where: { createdById: userId },
      include: {
        contacts: true,
      },
    });
  }

  async findOne(id: string, userId: string) {
    return await this.prisma.group.findUnique({
      where: { id, createdById: userId },
      include: {
        contacts: true,
      },
    });
  }

  async update(id: string, updateGroupDto: UpdateGroupDto, userId: string) {
    return await this.prisma.group.update({
      where: { id, createdById: userId },
      data: updateGroupDto,
    });
  }

  async remove(id: string, userId: string) {
    return await this.prisma.group.delete({
      where: { id, createdById: userId },
    });
  }
}
