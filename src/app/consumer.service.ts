import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('order')
export class ConsumerService {
  private readonly logger = new Logger(ConsumerService.name);

  @Process('create')
  consume(job: Job) {
    this.logger.debug('Order queue consuming for created records');
    this.logger.debug('Job ID:' + job.id);
    this.logger.debug(job.data);
    job.finished();
    this.logger.debug('Completed');
  }
}
