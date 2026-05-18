import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class QueueService {
    constructor(@InjectQueue("email-queue") private readonly emailQueue: Queue) { }

    async addEmailJob(emailJobId: string, delay?: number) {
        await this.emailQueue.add("send-email",
            {
                emailJobId
            },
            {
                delay,
                attempts: 3,
                backoff: {
                    type: 'exponential',
                    delay: 5000
                }
            }
        )
    }
}
