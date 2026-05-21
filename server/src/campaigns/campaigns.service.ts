import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueueService } from 'src/queue/queue.service';

@Injectable()
export class CampaignsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly queueService: QueueService
  ) { }

  async create(createCampaignDto: CreateCampaignDto, createdById: string) {
    const {
      subject,
      body,
      additionalEmails = [],
      groupIds = [],
      scheduledAt,
    } = createCampaignDto;

    const campaign = await this.prisma.campaign.create({
      data: {
        subject,
        body,
        status: scheduledAt
          ? 'SCHEDULED'
          : 'PROCESSING',
        scheduledAt,

        createdBy: {
          connect: {
            id: createdById,
          },
        },

        ...(groupIds.length > 0 && {
          groups: {
            create: groupIds.map(
              (groupId) => ({
                group: {
                  connect: {
                    id: groupId,
                  },
                },
              }),
            ),
          },
        }),
      },
    });

    let emailsOfGroups: string[] = [];

    if (groupIds.length > 0) {
      const groups = await this.prisma.group.findMany({
        where: {
          id: { in: groupIds },
          createdById,
        },

        include: {
          contacts: true,
        },
      });

      emailsOfGroups = groups.flatMap((group) => group.contacts).map((contact) => contact.email);
    }

    const uniqueEmails = [...new Set([...emailsOfGroups, ...additionalEmails])];

    if (uniqueEmails.length === 0) {
      throw new BadRequestException('No recipients found');
    }

    const emailJobs = await this.prisma.emailJob.createManyAndReturn({
      data: uniqueEmails.map((email) => ({
        campaignId: campaign.id,
        recipientEmail: email,
      })),
    });

    const delay = scheduledAt ? new Date(scheduledAt).getTime() - Date.now() : undefined;
    await Promise.all(
      emailJobs.map((job) => this.queueService.addEmailJob(
        job.id,
        delay,
      ),
      ),
    );

    return campaign;
  }

  async findAll(createdById: string) {
    const campaigns = await this.prisma.campaign.findMany({
      where: { createdById },
      include: { emailJobs: true },
      orderBy: { createdAt: 'desc' },
    });


    const result = campaigns.map(campaign => {
      const counts = {
        TOTAL: campaign.emailJobs.length,
        SENT: 0,
        PROCESSING: 0,
        FAILED: 0,
      }

      campaign.emailJobs.forEach(emailJob => {
        counts[emailJob.status]++;
      });

      campaign['stats'] = counts
      if (counts.PROCESSING === 0) campaign.status = "COMPLETED";
      const { emailJobs, ...rest } = campaign;
      return rest;
    })

    return result;

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
