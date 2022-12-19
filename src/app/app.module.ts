import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConsumerService } from './consumer.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'order',
    }),
  ],
  providers: [ConsumerService],
  controllers: [AppController],
})
export class AppModule {}
