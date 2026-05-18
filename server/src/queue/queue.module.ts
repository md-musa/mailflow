import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    BullModule.forRoot({
      connection: { host: 'localhost', port: 6379 },
      defaultJobOptions: { attempts: 3, delay: 5000 }
    }),
    BullModule.registerQueue({ name: 'email-queue' }),
  ],
  controllers: [],
  providers: [QueueService],
  exports: [QueueService, BullModule]
})
export class QueueModule { }
