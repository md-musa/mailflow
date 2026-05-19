import { Module } from '@nestjs/common';
import { EmailProcessor } from './email.processor';
import { BullModule } from '@nestjs/bullmq';
import { MailModule } from 'src/mail/mail.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email-queue',
    }),
    MailModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [EmailProcessor],
})
export class WorkersModule {}
