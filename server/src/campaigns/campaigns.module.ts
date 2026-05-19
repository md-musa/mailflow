import { Module } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { QueueModule } from 'src/queue/queue.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, QueueModule, AuthModule],
  controllers: [CampaignsController],
  providers: [CampaignsService],
})
export class CampaignsModule {}
