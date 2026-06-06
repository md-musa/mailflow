import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { BullModule } from '@nestjs/bullmq';
import envConfig from 'src/config/env.config';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: envConfig().redis.host,
        port: envConfig().redis.port,
        password: envConfig().redis.password
      },
      defaultJobOptions: { attempts: 3, delay: 5000 },
    }),
    BullModule.registerQueue({ name: 'email-queue' }),
  ],
  controllers: [],
  providers: [QueueService],
  exports: [QueueService, BullModule],
})
export class QueueModule { }
