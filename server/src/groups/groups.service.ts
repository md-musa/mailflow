import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GroupsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createGroupDto: CreateGroupDto, userId: string) {
    const group = await this.prisma.group.create({
      data: {
        ...createGroupDto,
        createdById: userId,
      },
    });

    return group;
  }

  async findAll() {
    return await this.prisma.group.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.group.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    return await this.prisma.group.update({
      where: { id },
      data: updateGroupDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.group.delete({
      where: { id },
    });
  }
}
