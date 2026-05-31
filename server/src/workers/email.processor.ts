import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job, Worker } from 'bullmq';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Processor('email-queue')
export class EmailProcessor extends WorkerHost {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService
  ) {
    super();
  }

  async process(job: Job<any>): Promise<any> {
    const { emailJobId } = job.data;

    const emailJob = await this.prisma.emailJob.findUnique({
      where: { id: emailJobId },
      include: { campaign: true },
    });

    if (!emailJob) return;

    try {
      await this.prisma.emailJob.update({
        where: { id: emailJob.id },
        data: { status: 'PROCESSING' },
      });

      await this.mailService.sendEmail({
        to: emailJob.recipientEmail,
        subject: emailJob.campaign.subject,
        html: emailJob.campaign.body,
      });

      await new Promise((resolve) => {
        setTimeout(resolve, 100);
      });


      await this.prisma.emailJob.update({
        where: { id: emailJob.id },
        data: {
          status: "SENT",
          sentAt: new Date()
        }
      })
    } catch (error: any) {
      await this.prisma.emailJob.update({
        where: { id: emailJob.id },
        data: {
          status: 'FAILED',
          failedReason: error ? error.message : '',
          attempts: {
            increment: 1,
          },
        },
      });
      throw error;
    }
  }
}
