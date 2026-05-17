import { Injectable } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CampaignsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createCampaignDto: CreateCampaignDto, createdById: string) {
    const { groupIds } = createCampaignDto;

    const groups = await this.prisma.group.findMany({
      where: {
        id: {
          in: groupIds
        },
        createdById
      },
      include: {
        contacts: true
      }
    });

    const mails = groups.flatMap(group => group.contacts).map(contact => contact.email)

    console.log(mails);
    // filter duplicate email




    return mails
    // return this.prisma.campaign.create({
    //   data: {
    //     ...createCampaignDto,
    //     createdById
    //   }
    // })

  }

  async findAll() {
    return await this.prisma.campaign.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.campaign.findUnique({
      where: { id }
    })
  }

  async update(id: string, updateCampaignDto: UpdateCampaignDto) {
    return await this.prisma.campaign.update({
      where: { id },
      data: updateCampaignDto
    })
  }

  async remove(id: string) {
    return await this.prisma.campaign.delete({
      where: { id }
    })
  }
}
