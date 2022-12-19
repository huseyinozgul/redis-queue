import { IsNotEmpty } from 'class-validator';

export class OrderDto {
  @IsNotEmpty()
  order_id: string;

  @IsNotEmpty()
  description: string;
}
