import { InjectQueue } from '@nestjs/bull';
import { Body, Controller, Post } from '@nestjs/common';
import { Queue } from 'bull';
import { OrderDto } from '../order/dto';
import { ResponseError, ResponseSuccess } from '../types';

@Controller('app')
export class AppController {
  constructor(@InjectQueue('order') private readonly orderQueue: Queue) {}

  @Post('order')
  async createOrder(
    @Body() data: OrderDto,
  ): Promise<ResponseSuccess | ResponseError> {
    try {
      const response = await this.orderQueue.add('create', data);
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }
}
