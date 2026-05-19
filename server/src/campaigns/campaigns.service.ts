import { Injectable } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueueService } from 'src/queue/queue.service';
import { EmailJob } from 'generated/prisma/client';

@Injectable()
export class CampaignsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly queueService: QueueService
  ) {}

  async create(createCampaignDto: CreateCampaignDto, createdById: string) {
    const { subject, body, groupIds, scheduledAt } = createCampaignDto;

    const campaign = await this.prisma.campaign.create({
      data: {
        subject,
        body,
        status: scheduledAt ? 'SCHEDULED' : 'PROCESSING',
        scheduledAt,

        createdBy: {
          connect: { id: createdById },
        },

        groups: {
          create: groupIds.map((groupId) => ({
            group: {
              connect: {
                id: groupId,
              },
            },
          })),
        },
      },
    });

    const groups = await this.prisma.group.findMany({
      where: {
        id: {
          in: groupIds,
        },
        createdById,
      },
      include: {
        contacts: true,
      },
    });

    const emails = groups.flatMap((group) => group.contacts).map((contact) => contact.email);
    const uniqueEmails = [...new Set(emails)];

    const emailJobs = await this.prisma.emailJob.createManyAndReturn({
      data: uniqueEmails.map((email) => ({
        campaignId: campaign.id,
        recipientEmail: email,
      })),
    });

    for (const job of emailJobs) {
      await this.queueService.addEmailJob(
        job.id,

        scheduledAt ? new Date(scheduledAt).getTime() - Date.now() : undefined
      );
    }

    return campaign;
  }

  async findAll() {
    return await this.prisma.campaign.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.campaign.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateCampaignDto: UpdateCampaignDto) {
    return await this.prisma.campaign.update({
      where: { id },
      data: updateCampaignDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.campaign.delete({
      where: { id },
    });
  }
}
