import { IsInt, IsString, IsDateString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItemDto } from './order-item.dto';

export class OrderDto {
  @IsInt()
  orderId: number;

  @IsInt()
  userId: number;

  @IsDateString()
  orderDate: string;

  @IsInt()
  totalPrice: number;

  @IsString()
  status: string;

  @IsString()
  receiverName: string;

  @IsString()
  addr: string;

  @IsString()
  addrDetail: string;

  @IsString()
  phoneNumber: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  orderItems: OrderItemDto[];
}