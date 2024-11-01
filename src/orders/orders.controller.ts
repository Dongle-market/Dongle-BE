import { Request } from 'express';
import { OrdersService } from './orders.service';
import { Controller, Get, Param, Req } from '@nestjs/common';
import { Order } from './entities/order.entity';

@Controller('apis/order')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService 
  ) {}

  /** 내 주문내역 */
  @Get('my')
  async getByUserId(@Req() req: Request): Promise<Order[]> {
    const userId = req['userId'];
    return await this.ordersService.getByUserId(userId);
  }

  /** 단일주문 조회 */
  @Get(':id')
  async getOne(@Param('id') orderId: number): Promise<Order> {
    return await this.ordersService.getOne(orderId);
  }
}
